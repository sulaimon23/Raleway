export interface Data {
    suggestions: [{ text: string }];
}

export interface Props {
    data: Data;
    param: string | string[];
}
