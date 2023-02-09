export interface Data {
    suggestions: [{ text: string }];
}

export interface Props {
    data: Data;
    param: string | string[];
}
export interface DataItem {
    image: string;
    brand: string;
    name: string;
    price: number;
}
