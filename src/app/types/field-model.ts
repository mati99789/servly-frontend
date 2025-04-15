export type FieldType = 'text' | 'number' | 'email' | 'date' | 'select' | 'checkbox' | 'radio' | 'textarea';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
  value?: any;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    customValidation?: (value: any) => boolean;
  };
}

export interface DynamicForm {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}
