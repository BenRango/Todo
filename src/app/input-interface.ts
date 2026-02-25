import { inputTypes } from "./types"

export interface InputInterface {
    type: inputTypes, 
    placeholder ?: string, 
    label: string, 
    isSetter?: boolean, 
    value?: string, 
    witness?: string, 
    disabled?: boolean, 
    onUpdate : (value?: string) => void, confirmValid: boolean
    onValidChange: (v: boolean) => void

}