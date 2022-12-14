import styles from '../styles/Checkout.module.scss';
import Layout from "../components/Layout";
import Input from '../components/Input';
import { CartModel } from '../models/cart.model';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../utils/number';
import {TbTruckDelivery} from "react-icons/tb";
import Button from "../components/Button";

export default function Checkout() {
    const cartState: CartModel[] = useSelector(state => (state as any).cart.products) as CartModel[];

    // Compute total cost of products in the cart
    const computeCartSubtotal = () => cartState.reduce((acc, prod) => acc + (prod.quantity * prod.price), 0);

    // For this exercise, we will assume the tax & fees is 20%
    const computeCartFees = () => computeCartSubtotal() * 0.2;

    // Total
    const computeTotal = () => computeCartSubtotal() + computeCartFees();

    return (
        <Layout title={'Checkout'} hideCart={true}>
            <div className={styles.container}>
                <div className="pr-8">
                    <h1 className="text-3xl font-bold mt-3 mb-8">Personal information</h1>
                    <div className="form mb-8">
                        <Input label={'Name'} placeholder={'Enter name..'} />
                        <Input label={'Email'} placeholder={'Enter your email..'} />
                    </div>
                    <h2 className="font-semibold">Payment</h2>
                    <div className="rounded-xl border border-solid mt-6 mb-8 border-orange-700 flex px-6 py-4 items-center gap-1 bg-orange-50 text-orange-500">
                        <TbTruckDelivery size={'48px'} />
                        <div className="">
                            <h2 className="font-semibold">Cash on Delivery</h2>
                            <p className="text-orange-400">You payment will be requested on delivery</p>
                        </div>
                    </div>

                    <Button>Place order</Button>
                </div>
                <div className="bg-gray-100 px-4 pt-4 pb-6 relative rounded-lg">
                    <div className="pb-3">
                        <h2 className="text-lg font-semibold">Items</h2>
                    </div>
                    <div className="item">
                        {
                            cartState.map((product, index) => {
                                return (
                                    <div key={'cart_' + index}
                                         className={'product-tile flex justify-between pl-2 pr-4 mb-6 items-center'}>
                                        <div className="leading flex items-center">
                                            <div className="avatar h-14 w-14 rounded-lg mr-3 overflow-hidden">
                                                <img src={product.image} alt={product.name}
                                                     className="w-full object-cover h-full"/>
                                            </div>
                                            <div>
                                                <h1 className="font-medium text-lg">{product.name}&nbsp;&nbsp;<span
                                                    className="text-slate-400 text-lg">x{product.quantity}</span></h1>
                                                <p className="text-theme-dark">
                                                    <span className="text-slate-500">Size: {product.size} |</span>&nbsp;&nbsp;
                                                    <span>{formatCurrency(product.price * product.quantity)}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="trailing">
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.money_details}>
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
                    </div>
                </div>
            </div>
        </Layout>
    )
}