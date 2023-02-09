import useHttpSearch from "@/hooks/useSearchHook";
import styles from "@/styles/Search.module.css";
import { Props } from "@/types.model";
import Image from "next/image";

//
//

//
const SearchInput = (props: { param: Props }) => {
    //
    const { inputValue, isFocus, setFocus, onChange, data } = useHttpSearch(
        props.param
    );
    console.log(props);
    //
    return (
        <div className={styles.inputWrapper}>
            <Image
                src="/vector.svg"
                alt="Menu Logo"
                width={24}
                height={24}
                priority
            />
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
                        <input
                            value={inputValue || ""}
                            onFocus={() => setFocus(true)}
                            onChange={(e) => onChange(e)}
                            type="text"
                            placeholder="Search Product"
                        />
                    </div>
                </div>
                {isFocus && (
                    <div className={styles.searchResult}>
                        <div className={styles.titleInfo}>
                            <h1>Popular searches</h1>
                            <h1 className={styles.clear}>Clear all</h1>
                        </div>
                        {data.suggestions.map((ele, index) => (
                            <button
                                key={`${ele}-${index}`}
                                type="submit"
                                className={styles.recent}
                            >
                                <h1>{ele.text}</h1>
                                <Image
                                    src="/search.svg"
                                    alt="close icon"
                                    width={20}
                                    height={20}
                                    priority
                                />
                            </button>
                        ))}
                    </div>
                )}
                <div className={isFocus ? styles.overlay : ""}></div>
            </div>
        </div>
    );
};

export default SearchInput;
