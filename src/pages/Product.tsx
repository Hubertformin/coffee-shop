import Layout from "../components/Layout";
import {useEffect, useState} from "react";
import {ProductModel} from "../models/product.model";
import {useParams} from "react-router-dom";
import {DATA} from "../data";
import styles from '../styles/Product.module.scss';
import {formatCurrency} from "../utils/number";
import QuantityInput from "../components/QuantityInput";
import Button from "../components/Button";
import {BiCoffeeTogo} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {addToCartAction, removeFromCartAction} from "../store/cart.slice";
import {toast} from "react-toastify";
import {CartModel} from "../models/cart.model";

export default function Product() {
    const cartState: CartModel[] = useSelector(state => (state as any).cart.products) as CartModel[];
    const [product, setProduct] = useState<ProductModel>();
    const [isItemInCart, setIsItemInCart] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    
    const [cartData, setCartData] = useState({
        quantity: 1,
        size: 'sm'
    });

    useEffect(() => {
        // Get product by id
        const item = DATA.products.find(p => p.id.toString() === params?.productId)
        setProduct(item);
        // Check's if the current item is already in the cart
        // We save this state so we can either show a 'add to cart' or 'remove from cart' button
        setIsItemInCart(cartState.some(p => p.id === item?.id))
    }, [params?.productId, cartState]);


    /**
     * Mutate Item data state object..
     */
    const mutateItemData = (key: string, val: any) => {
        setCartData((prevState) => ({...prevState, [key]: val}))

    }

    /**
     * Add product to cart
     */
    const addToCart = () => {
        dispatch(addToCartAction({
            ...product,
            ...cartData
        }));
        toast.success(`${product?.name} was added to cart`);
    }

    /**
     * Remove product from cart
     */
    const removeFromCart = () => {
        dispatch(removeFromCartAction(product?.id));
    }

    return (
        <Layout title={product?.name || ''}>
            {product &&
                <div className={`${styles.product_view} md:mt-6`}>
                    <div className={styles.image_box}>
                        <img src={product.image} alt={product.name}/>
                    </div>
                    <div className={`px-6 md:px-8 pt-10 md:pt-16 pb-40 md:pb-0 ${styles.details_box}`}>
                        <div className="flex justify-between">
                            <h1 className="text-4xl mb-3 font-bold">{product.name}</h1>
                            <h2 className="text-2xl font-semibold mb-6 text-theme-dark">{formatCurrency(product.price * cartData.quantity)}</h2>
                        </div>
                        <p className="text-slate-500 mb-6">{product.description}</p>
                        <div className="properties mb-8">
                            <h3 className="header font-semibold mb-2">Ingredients</h3>
                            {
                                product.ingredients.map((ing, index) => (<div key={'in_'+index} className="chip rounded-full px-4 py-2 text-sm mr-3 mb-2 bg-gray-100 w-auto inline-block">{ing}</div>))
                            }
                        </div>

                        <QuantityInput onChange={val => mutateItemData('quantity', val)} />

                        <div className="sizes flex pt-8">
                            <button onClick={() => mutateItemData('size', 'sm')} className={`${styles.size_select_btn} ${cartData.size === 'sm' ? styles.size_select_btn_active: ''}`}>
                                <BiCoffeeTogo size={'32px'} />
                                <p className="text mb-0 text-xs mt-2">Small (14g)</p>
                            </button>

                            <button onClick={() => mutateItemData('size', 'lg')} className={`${styles.size_select_btn} ${cartData.size === 'lg' ? styles.size_select_btn_active: ''}`}>
                                <BiCoffeeTogo size={'42px'} />
                                <p className="text mb-0 text-xs mt-2">Large (28g)</p>
                            </button>
                        </div>

                        {
                            isItemInCart ?
                                (<div className="pt-8">
                                    <Button bg={'#000'} className={'w-full md:w-auto'} onClick={removeFromCart}>Remove from Cart</Button>
                                </div>) :
                                (<div className="pt-8">
                                    <Button className={'w-full md:w-auto'} onClick={addToCart}>Add to Cart</Button>&nbsp;
                                    <Button className={'w-full md:w-auto'} type="secondary">Buy Now</Button>
                                </div>)
                        }

                    </div>
                </div>
            }
        </Layout>
    )
}