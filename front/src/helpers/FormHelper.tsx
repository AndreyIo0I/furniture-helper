import { Dispatch, SetStateAction } from "react";
import IFormState from "./IFormState";

export default class FormHelper {
    private initialState: IFormState;
    private setState: Dispatch<SetStateAction<IFormState>>;

    constructor(initialState: IFormState, setState: Dispatch<SetStateAction<IFormState>>) {
        this.initialState = initialState;
        this.setState = setState;
    }

    handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ ...this.initialState, [e.currentTarget.name]: e.currentTarget.value === '' ? null : e.currentTarget.value });
    }
}