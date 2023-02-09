import useHttpSearch from "@/hooks/useSearchHook";
import styles from "@/styles/Search.module.css";
import { Props } from "@/types.model";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

//
//

//
const SearchInput = (props: { param: Props }) => {
    //
    const searchInput: any = useRef(null);
    const { inputValue, isFocus, setFocus, onChange, data, setValue } =
        useHttpSearch(props.param);
    const router = useRouter();
    const [recent, setRecent] = useState([]);
    const [cursor, setCursor] = useState<number>(0);
    const [isRecent, setIsRecent] = useState(false);

    const search = (e: string) => {
        setValue(e);
        let namesSet = getStorage();
        localStorage.setItem(
            "recentSearch",
            JSON.stringify(namesSet.slice(0, 5))
        );
        router.replace({
            query: { ...router.query, q: e },
        });
        setFocus(false);
    };

    const getStorage = () => {
        let storage: string | null = localStorage.getItem(
            "recentSearch"
        ) as string;
        let inputValues = JSON.parse(storage) || [];
        if (inputValue && inputValue?.length > 0) {
            inputValues.unshift(inputValue);
        }
        let namesSet = Array.from(new Set(inputValues));
        return namesSet;
    };
    //
    const removeIndex = (index: number) => {
        let storage: any = localStorage.getItem("recentSearch");
        let recentSearch: any = JSON.parse(storage);
        recentSearch.splice(index, 1);
        localStorage.setItem("recentSearch", JSON.stringify(recentSearch));
        setRecent(recentSearch);
    };
    //
    const handleKeyDown = (event: any) => {
        let activeData = isRecent ? recent : data.suggestions;
        if (event.key === "Enter") {
            if (activeData.length <= 0) {
                search(event.target.value);
                setIsRecent(false);
                searchInput.current.blur();
            } else {
                search(activeData[cursor].text);
                setIsRecent(false);
                searchInput.current.blur();
            }
        }
        if (event.keyCode === 38 && cursor > 0) {
            setCursor((prev) => prev - 1);
        } else if (event.keyCode === 40 && cursor < activeData.length - 1) {
            setCursor((prev) => prev + 1);
        }
    };
    //
    useEffect(() => {
        // Perform localStorage action
        let storage: any = localStorage.getItem("recentSearch");
        let recentSearch: any = JSON.parse(storage);
        if (
            (!data.suggestions[0]?.text?.length ||
                data.suggestions[0]?.text?.length <= 0) &&
            recentSearch
        ) {
            setIsRecent(true);
            setRecent(recentSearch);
        } else {
            setIsRecent(false);
        }
    }, [data, inputValue]);
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
