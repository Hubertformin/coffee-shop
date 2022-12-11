/**
 * Author: Hubert Formin
 *
 */
import {ChangeEvent, useEffect, useState} from "react";
import styles from '../styles/Home.module.scss';
import {DATA} from "../data";
import {formatCurrency} from "../utils/number";
import {ProductModel} from "../models/product.model";
import {FiSearch} from "react-icons/fi";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    // This save the state of the active category showing on the view
    const [categoryFilter, setCategoryFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        initProducts();
    }, []);

    const initProducts = () => {
        setCategories(['All', ...DATA.categories]);
        setProducts(DATA.products.slice(0,12));
    }

    const onSearch = (e:  ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        if (!value) {
            initProducts();
            return;
        }
        /**
         * Searching is done by displaying the items that match the search query by name
         * Then we display the items that match the search query in description
         *
         */
        const search$ = new RegExp(value, 'ig');

        const items = [
            ...DATA.products.filter(product => product.name.search(search$) > -1),
            ...DATA.products.filter(product => product.description.search(search$) > -1)
        ];

        setProducts([...items]);
    };

    /**
     * @param category
     * Filter the items that show on the view by category
     */
    const changeViewCategory = (category: string) => {
        setCategoryFilter(category);
        if (category === 'All') initProducts();
        else setProducts(DATA.products.filter(p => p.category === category));
    }

    return(
        <Layout title={'Welcome to Coffee Shop, Shop different flavors of coffee'}>
            <div className={styles.items_view}>
                <div className={`${styles.categories_col} pt-8 overflow-y-auto`}>
                    <h2 className="font-black text-sm text-gray-800 capitalize mb-4 text-theme-dark pl-4">CATEGORIES</h2>
                    <ul>
                        {
                            categories.map((category, index) => {
                                return <li key={`cat_${index}`}
                                           onClick={() => changeViewCategory(category)}
                                           className={ categoryFilter === category ? styles.categories_active : ''}>{category}</li>
                            })
                        }
                    </ul>
                </div>

                <div className={`${styles.items_col} px-6 overflow-y-auto`}>
                    <div className={styles.search_box}>
                        <FiSearch size={'24px'} />
                        <input type="text" placeholder={'Search..'} onChange={onSearch} />
                    </div>
                    <h2 className="font-black text-lg text-gray-800 capitalize text-theme-dark mb-4">{searchText ? `Showing results for "${searchText}"` : `Items(${products.length})`}</h2>
                    <div className={styles.items_grid}>
                        {
                            products.map((product, index) => {
                                return (
                                    <div
                                        key={'item_'+index}
                                        className={`${styles.item_card} mb-10 md:mb-0 rounded-lg`}
                                        onClick={() => navigate(`/${product.category}/${product.id}`)}
                                    >
                                        <div className={styles.item_image_box}>
                                            <img src={product.image} alt={product.name}/>
                                        </div>
                                        <div className="details-box mt-4 px-4 pb-4">
                                            <h2 className="name text-lg font-bold">{product.name}</h2>
                                            <p className={`${styles.item_description} text-slate-500 text-sm mb-1`}>{product.description}</p>
                                            <p className="font-semibold text-theme-dark text-gray-700">{formatCurrency(product.price)}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default Home;