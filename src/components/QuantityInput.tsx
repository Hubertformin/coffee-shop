import styles from '../styles/QuantityInput.module.scss';
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {useState} from "react";

interface Props {
    onChange?: (val: number) => void;
}
export default function QuantityInput({onChange}: Props) {
    const [orderQty, setOrderQty] = useState(1);

    /**
     *
     * @param value value to be added to quantity data
     * @param replace if true, replace the old value with the new value instead of addition
     */
    const changeQty = (value: number, replace = false) => {
        if (value === -1 && orderQty === 1) return;
        const newVal = !replace ? orderQty + value : value;
        setOrderQty(newVal);
        // emit change val
        if (onChange) {
            onChange(newVal)
        }
    }
    return(
        <div className={styles.input_box}>
            <button onClick={() => changeQty(-1)} className={styles.change_btn}>
                <AiOutlineMinus size={'24px'} />
            </button>
            <input type="number" value={orderQty} onChange={(e) => changeQty(Number(e.target.value), true)} min={1} />
            <button  onClick={() => changeQty(1)} className={styles.change_btn}>
                <AiOutlinePlus size={'24px'} />
            </button>
        </div>
    )
}