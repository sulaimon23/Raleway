import React from "react";
import styles from "@/styles/Search.module.css";
import Image from "next/image";
import { useState } from "react";

//
//
const SearchInput = () => {
    //
    const [isFocus, setFocus] = useState(false);

    //
    return (
        <div
            className={`${styles.searchWrapper} ${
                isFocus ? styles.position : ""
            }`}
        >
            <div className={styles.containInput}>
                <div className={styles.input}>
                    <Image
                        src="/search.svg"
                        alt="search icon"
                        width={20}
                        height={20}
                        priority
                    />
                    <input type="text" placeholder="Search Product" />
                </div>
            </div>
            {isFocus && (
                <div className={styles.searchResult}>
                    <div className={styles.titleInfo}>
                        <h1>Recent searches</h1>
                        <h1 className={styles.clear}>Clear all</h1>
                    </div>
                    <button
                        tabIndex={1}
                        type="submit"
                        className={styles.recent}
                    >
                        <h1>Coca cola</h1>
                        <Image
                            src="/close.svg"
                            alt="close icon"
                            width={20}
                            height={20}
                            priority
                        />
                    </button>
                </div>
            )}
            <div className={isFocus ? styles.overlay : ""}></div>
        </div>
    );
};

export default SearchInput;
