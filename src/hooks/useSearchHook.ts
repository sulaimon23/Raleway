import { Data, Props } from "@/types.model";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
//
//
const useHttpSearch = (param: Props) => {
    const [isFocus, setFocus] = useState<boolean>(false);
    const searchInput: any = useRef(null);
    const router = useRouter();
    const [recent, setRecent] = useState([]);
    const [cursor, setCursor] = useState<number>(0);
    const [isRecent, setIsRecent] = useState(false);
    const [inputValue, setValue] = useState<string | string[] | null>(
        param.param
    );
    const [data, setData] = useState<Data>(param.data);

    //
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setValue(value);
        fetchSuggestion(value);
    };

    const fetchSuggestion = async (param: string) => {
        try {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `https://api.matspar.se/autocomplete?query=${param}`,
                headers: {},
            };
            const res = await axios(config);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

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

    return {
        inputValue,
        isFocus,
        setFocus,
        onChange,
        data,
        setValue,
        handleKeyDown,
        searchInput,
        isRecent,
        search,
        cursor,
        removeIndex,
        recent,
        setIsRecent,
    };
};

export default useHttpSearch;
