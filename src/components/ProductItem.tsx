import Image from "next/image";
import styles from "@/styles/ProductItem.module.css";
import { DataItem } from "@/types.model";

//

const ProductItem = (props: { item: DataItem }) => {
    const getProductImageUrl = (image: string): string => {
        return image
            ? `https://d1ax460061ulao.cloudfront.net/140x150/${image[0]}/${image[1]}/${image}.webp`
            : "";
    };
    //
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <Image
                    src={getProductImageUrl(props.item.image)}
                    alt="Menu Logo"
                    width={40}
                    height={98}
                    priority
                    quality={100}
                />
            </div>
            <div className={styles.wrapper}>
                <div>
                    <h1 className={styles.name}>{props.item.name}</h1>
                    <h1 className={styles.brand}>{props.item.brand}</h1>
                </div>
                <h1 className={styles.price}>${props.item.price}</h1>
            </div>
        </div>
    );
};

export default ProductItem;
