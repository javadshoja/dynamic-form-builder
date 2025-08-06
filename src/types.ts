export type FieldType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'switch'

export type Option = { label: string; value: string }

export interface BaseField {
  id: string
  type: FieldType
  name: string
  label?: string
  required?: boolean
}

export interface TextField extends BaseField {
  type: 'text'
  placeholder?: string
  defaultValue?: string
}

export interface NumberField extends BaseField {
  type: 'number'
  min?: number
  max?: number
  step?: number
  defaultValue?: number
}

export interface TextareaField extends BaseField {
  type: 'textarea'
  rows?: number
  placeholder?: string
  defaultValue?: string
}

export interface SelectField extends BaseField {
  type: 'select'
  options: Option[]
  defaultValue?: string
}

export interface RadioField extends BaseField {
  type: 'radio'
  options: Option[]
  defaultValue?: string
}

export interface CheckboxField extends BaseField {
  type: 'checkbox'
  defaultChecked?: boolean
}

export interface SwitchField extends BaseField {
  type: 'switch'
  defaultChecked?: boolean
}

export interface DateField extends BaseField {
  type: 'date'
  min?: string
  max?: string
  defaultValue?: string
}

export type AnyField =
  | TextField
  | NumberField
  | TextareaField
  | SelectField
  | RadioField
  | CheckboxField
  | SwitchField
  | DateField
