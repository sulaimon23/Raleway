import { Data, Props } from "@/types.model";
import { useState, ChangeEvent } from "react";
import axios from "axios";
//
//
const useHttpSearch = (param: Props) => {
    const [isFocus, setFocus] = useState<boolean>(false);
    const [inputValue, setValue] = useState<string | string[]>(param.param);
    const [data, setData] = useState<Data>(param.data);

    //
    // const [data, setData] = useState(success);
    // const [isOpen, setIsOpen] = useState(false);
    // useEffect(() => {
    //     setData(success);
    // }, [success]);
    // //
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(null);
    // const [value, setValue] = useState("Shipment Date");
    // const [search, setSearch] = useState("");
    // const [shipment, setShipment] = useState("");

    // const dateString = (date) => {
    //     return new Date(date).toLocaleDateString();
    // };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setValue(value);
        fetchSuggestion(value);
        // const [start, end] = dates;
        // setStartDate(start);
        // setEndDate(end);
        // if (start && end) {
        //     setIsOpen(!isOpen);
        //     let newValue = `${dateString(start)} - ${dateString(end)}`;
        //     setValue(newValue);
        //     let endDate = new Date(end).getTime();
        //     let startDate = new Date(start).getTime();
        //     let result = data.filter((ele) => {
        //         let time = new Date(ele.shipment_pickup_date).getTime();
        //         return startDate < time && time < endDate;
        //     });
        //     setData(result);
        // }
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

    // const clearDate = () => {
    //     setEndDate(null);
    //     setStartDate(new Date());
    //     setValue("Shipment Date");
    //     setIsOpen(false);
    //     fetchData(shipment, false, true);
    // };

    return {
        inputValue,
        isFocus,
        setFocus,
        onChange,
        data,
        // isOpen,
        // clearDate,
        // fetchData,
        // shipment,
        // value,
        // data,
        // startDate,
        // onChange,
        // endDate,
        // search,
    };
};

export default useHttpSearch;
