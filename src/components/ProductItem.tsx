import Image from "next/image";
import styles from "@/styles/ProductItem.module.css";

//
const ProductItem = () => {
    return (
        <div className={styles.card}>
            <Image
                src="/coke.svg"
                alt="Menu Logo"
                width={28}
                height={98}
                priority
            />
            <div className={styles.wrapper}>
                <div>
                    <h1 className={styles.name}>Product name</h1>
                    <h1 className={styles.brand}>Brand</h1>
                </div>
                <h1 className={styles.price}>$299</h1>
            </div>
        </div>
    );
};

export default ProductItem;
