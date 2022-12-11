import styles from '../styles/Cart.module.scss';
import {BsBag} from "react-icons/bs";
import {useEffect, useState} from "react";
import {TfiClose} from "react-icons/tfi";
import {useDispatch, useSelector} from "react-redux";
import {formatCurrency} from "../utils/number";
import {CartModel} from "../models/cart.model";
import {BiTrashAlt} from "react-icons/bi";
import {removeFromCartAction} from "../store/cart.slice";
import Button from "./Button";
import {Link, useNavigate} from "react-router-dom";

export default function Cart() {
    const cartState: CartModel[] = useSelector(state => (state as any).cart.products) as CartModel[];
    const [products, setProducts] = useState<CartModel[]>([]);
    const [showToggleBtn, setShowToggleBtn] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (cartState.length > 0) setShowToggleBtn(true)
        else {
            setShowToggleBtn(false);
            // if all the items have been cleared from the cart, we want to close the cart modal to
            // This happens in the event when the cart has been modified.
            if (cartState.length < 1) {
                setIsOpen(false);
            }
        }

        setProducts(cartState);
    }, [cartState]);

    // Show/Hide Cart
    const toggleCart = () => setIsOpen(prevState => !prevState);

    // Remove and item from cart
    const removeFromCart = (id: number) => dispatch(removeFromCartAction(id));

    // Compute total cost of products in the cart  cart
    const computeCartSubtotal = () => cartState.reduce((acc, prod) => acc + (prod.quantity * prod.price), 0);

    // For this exercise, we will assume the tax & fees is 20%
    const computeCartFees = () => computeCartSubtotal() * 0.2;

    // Total
    const computeTotal = () => computeCartSubtotal() + computeCartFees();

    return (
        <div className="cart_container">
            <button onClick={toggleCart}
                    className={`${styles.cart_toggle} ${showToggleBtn ? styles.cart_toggle_visible : ''}`}
            >
                {
                    isOpen ?
                        <TfiClose size={'36px'}/> :
                        <>
                            <BsBag size={'36px'}/>
                            <p className={styles.badge}>{cartState.length}</p>
                        </>

                }
            </button>
            <div className={`${styles.cart_body} px-6 py-4 ${isOpen ? styles.cart_body_open : ''}`}>
                <div className={styles.cart_body_header}>
                    <h1 className="font-bold text-xl">Cart</h1>
                    <p className="text-sm text-slate-600"> {cartState.length} item(s)</p>
                </div>
                <div className={styles.cart_body_container}>
                    {
                        products.map((product, index) => {
                            return (
                                <div key={'cart_' + index}
                                     className={'product-tile flex justify-between pl-2 pr-4 mb-6 items-center'}>
                                    <div className="leading flex items-center">
                                        <div className="avatar h-14 w-14 rounded-lg mr-3 overflow-hidden">
                                            <img src={product.image} alt={product.name}
                                                 className="w-full object-cover h-full"/>
                                        </div>
                                        <div>
                                            <Link to={`/${product.category}/${product.id}`}>
                                                <h1 className="font-semibold text-lg">{product.name}&nbsp;&nbsp;<span
                                                    className="text-slate-400 text-lg">x{product.quantity}</span></h1>
                                            </Link>
                                            <p className="text-theme-dark">
                                                <span className="text-slate-500">Size: {product.size} |</span>&nbsp;&nbsp;
                                                <span>{formatCurrency(product.price * product.quantity)}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="trailing">
                                        <button onClick={() => removeFromCart(product.id)}>
                                            <BiTrashAlt size={'28px'} className={'text-red-500'}/>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`${styles.cart_body_footer} px-4 py-4`}>
                    <div className="tile-row flex mb-1 justify-between">
                        <h2 className="font-semibold">Subtotal</h2>
                        <h2 className="font-semibold">{formatCurrency(computeCartSubtotal())}</h2>
                    </div>
                    <div className="tile-row flex mb-4 justify-between">
                        {/*For this exercise, we will assume the fees are 20%*/}
                        <h2 className="font-medium text-gray-600">Tax & Fees</h2>
                        <h2 className="font-medium text-gray-600">{formatCurrency(computeCartFees())}</h2>
                    </div>
                    <div className="tile-row flex justify-between">
                        <h1 className="font-bold text-xl">Total</h1>
                        <h1 className="font-bold text-xl">{formatCurrency(computeTotal())}</h1>
                    </div>
                    <Button className={'w-full mt-6'} onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
                </div>
            </div>
            {/*Close model when overlay bg is clicked*/}
            <div onClick={() => setIsOpen(false)} className={`${isOpen ? styles.cart_overlay : ''}`}></div>
        </div>
    );
}