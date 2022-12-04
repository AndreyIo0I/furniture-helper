import React from 'react'
import IFormState from './IFormState'

export default class FormHelper {
	private readonly initialState: IFormState
	private readonly setState: React.Dispatch<React.SetStateAction<IFormState>>

	constructor(initialState: IFormState, setState: React.Dispatch<React.SetStateAction<IFormState>>) {
		this.initialState = initialState
		this.setState = setState
	}

	handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			...this.initialState,
			[e.currentTarget.name]: e.currentTarget.value === '' ? null : e.currentTarget.value,
		})
	}
}