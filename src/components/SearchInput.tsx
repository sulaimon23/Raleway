import useHttpSearch from "@/hooks/useSearchHook";
import styles from "@/styles/Search.module.css";
import { Props } from "@/types.model";
import Image from "next/image";

//
//

//
const SearchInput = (props: { param: Props }) => {
    //
    const {
        inputValue,
        isFocus,
        setFocus,
        onChange,
        data,
        handleKeyDown,
        searchInput,
        isRecent,
        search,
        cursor,
        removeIndex,
        recent,
        setIsRecent,
    } = useHttpSearch(props.param);

    //
    return (
        <div className={styles.inputWrapper}>
            <Image
                src="/vector.svg"
                alt="Menu Logo"
                width={24}
                height={24}
                priority
                quality={100}
                sizes="(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw"
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
                            onChange={(e) => {
                                onChange(e);
                                setFocus(true);
                            }}
                            type="search"
                            placeholder="Search Product"
                            onKeyDown={handleKeyDown}
                            ref={searchInput}
                        />
                    </div>
                </div>
                {isFocus && !isRecent && (
                    <div className={styles.searchResult}>
                        <div className={styles.titleInfo}>
                            <h1>Popular searches</h1>
                        </div>
                        {data.suggestions.map((ele, index) => (
                            <button
                                key={`${ele}-${index}`}
                                type="submit"
                                onClick={() => search(ele.text)}
                                className={`${styles.recent} ${
                                    cursor === index ? styles.isActive : ""
                                }`}
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
                {isFocus && isRecent && (
                    <div className={styles.searchResult}>
                        <div className={styles.titleInfo}>
                            <h1>Recent Search</h1>
                            <h1
                                onClick={() => {
                                    localStorage.removeItem("recentSearch");
                                    setIsRecent(false);
                                }}
                                className={styles.clear}
                            >
                                Clear all
                            </h1>
                        </div>
                        {isRecent &&
                            recent.map((ele, index) => (
                                <button
                                    key={`${ele}-${index}`}
                                    type="submit"
                                    className={`${styles.recent} ${
                                        cursor === index ? styles.isActive : ""
                                    }`}
                                >
                                    <h1
                                        onClick={() => {
                                            search(ele);
                                        }}
                                    >
                                        {ele}
                                    </h1>
                                    <Image
                                        onClick={() => {
                                            removeIndex(index);
                                        }}
                                        src="/close.svg"
                                        alt="close icon"
                                        width={20}
                                        height={20}
                                        priority
                                    />
                                </button>
                            ))}
                    </div>
                )}
                <div
                    onClick={() => setFocus(false)}
                    className={isFocus ? styles.overlay : ""}
                ></div>
            </div>
        </div>
    );
};

export default SearchInput;
