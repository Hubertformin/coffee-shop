import styles from '../styles/Input.module.scss';

interface Props {
    label?: string;
    placeholder?: string;
}

export default function Input({placeholder = '', label = ''}: Props) {
    return (
        <div className={styles.input_control}>
            {label && <p className={styles.label}>{label}</p>}
            <div className={styles.input_group}>
                <input type="text" placeholder={placeholder}/>
            </div>
        </div>
    )
}