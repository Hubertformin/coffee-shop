import styles from '../styles/SkeletonLoader.module.scss';

export default function SkeletonLoader({className}) {
    return <div className={`${styles.skeleton} ${className}`} />
}
