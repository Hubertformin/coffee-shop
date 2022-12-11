import {GiCoffeeBeans} from "react-icons/gi";
import styles from '../styles/Header.module.scss'
import {useEffect} from "react";
import {Link} from "react-router-dom";

export default function Header({title = 'Welcome'}) {
    useEffect(() => {
        document.title = `${title} | Coffee Shop`;
    }, [title]);
    return(
        <div className={styles.header}>
            <div className="leading"></div>
            <Link to={'/'}>
                <h1 className="font-bold text-lg flex gap-1 text-green-900 items-center"><GiCoffeeBeans size={'28px'} />COFFEE SHOP</h1>
            </Link>
            <div className="trail flex justify-end px-6">
                {/*<ul>*/}
                {/*    <li className={'flex font-semibold text-sm items-center gap-1'}> CART(0)</li>*/}
                {/*</ul>*/}
            </div>
        </div>
    )
}