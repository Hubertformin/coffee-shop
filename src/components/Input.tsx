import styles from '../styles/Input.module.scss';

interface Props {
    label?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e) => void;
    onBlur?: (e) => void;
    isError?: boolean;
    errorLabel?: string;
}

export default function Input({label = '', isError, errorLabel, ...inputProps}: Props) {
    return (
        <div className={styles.input_control}>
            {label && <p className={`${styles.label} ${isError ? styles.errorLabel : ''}`}>{label}</p>}
            <div className={`${styles.input_group} ${isError ? styles.errorInput : ''}`}>
                <input type="text" {...inputProps} />
            </div>
            {isError && <p className={styles.errorText}>{errorLabel}</p>}
        </div>
    )
}