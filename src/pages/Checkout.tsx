import styles from '../styles/Checkout.module.scss';
import Layout from "../components/Layout";

export default function Checkout() {
    return (
        <Layout title={'Checkout'}>
            <div className={styles.container}>
                <div className=""></div>
                <div className="bg-gray-200 rounded-lg"></div>
            </div>
        </Layout>
    )
}