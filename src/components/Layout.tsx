import styles from "../styles/Layout.module.scss";
import Header from "./Header";
import {ReactNode} from "react";
import Cart from "./Cart";

interface Props {
    title: string;
    children: ReactNode,
    hideCart?: boolean;
}

export default function Layout({title = '', hideCart=false, children}: Props) {
    return(
        <main className={styles.page}>
            <div className={`${styles.body} rounded`}>
                <Header title={title} />

                <div className={`${styles.content} md:pt-4`}>
                    {children}
                </div>
            </div>
            {!hideCart && <Cart />}
            <footer>
                <ul>
                    <li>Terms of Service</li>
                    <li>&copy; 2022 COFFEE SHOP</li>
                    <li>Privacy Policy</li>
                </ul>
            </footer>
        </main>
    )
}