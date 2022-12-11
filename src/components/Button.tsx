import {ReactNode} from "react";
import styles from '../styles/Button.module.scss';

interface Props {
    type?: 'default' | 'secondary',
    children?: ReactNode,
    onClick?: () => void;
    className?: string;
    bg?: string;
}

export default function Button({type = 'default', onClick, className='', bg, children}: Props) {
    return (
        <button
            onClick={() => onClick ? onClick() : null}
            style={bg ? {backgroundColor: bg}: {}}
            className={`${styles.button} ${styles[type]} ${className}`} type="button"
        >{children}</button>
    )
}