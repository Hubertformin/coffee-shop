import {ReactNode} from "react";
import styles from '../styles/Button.module.scss';
import {ImSpinner8} from "react-icons/im";

interface Props {
    type?: 'default' | 'secondary',
    htmlType?: 'button' | 'reset' | 'submit';
    children?: ReactNode,
    onClick?: () => void;
    className?: string;
    bg?: string;
    isLoading?: boolean;
    loadingText?: string;
}

export default function Button({type = 'default', onClick, className='', htmlType='button', isLoading = false, loadingText, bg, children}: Props) {
    return (
        <button
            onClick={() => onClick ? onClick() : null}
            style={bg ? {backgroundColor: bg}: {}}
            type={htmlType}
            disabled={isLoading}
            className={`${styles.button} ${styles[type]} ${className}`}
        >
            {isLoading && <div className="inline-block mr-2">
                <ImSpinner8 className={styles.spinner} />
            </div>}
            {(isLoading && loadingText) ? loadingText : children}
        </button>
    )
}