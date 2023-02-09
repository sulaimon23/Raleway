import { Data, Props } from "@/types.model";
import { useState, ChangeEvent } from "react";
import axios from "axios";
//
//
const useHttpSearch = (param: Props) => {
    const [isFocus, setFocus] = useState<boolean>(false);
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

    return {
        inputValue,
        isFocus,
        setFocus,
        onChange,
        data,
        setValue,
    };
};

export default useHttpSearch;
