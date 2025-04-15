import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {DynamicForm, FormField} from "../types/field-model";

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  private formSubject = new BehaviorSubject<DynamicForm[]>([]);

  getForms(): Observable<DynamicForm[]> {
    return this.formSubject.asObservable();
  }

  getForm(id: string): DynamicForm | undefined  {
    const form = this.formSubject.getValue()
    return form.find((item) => item.id === id)
  }

  createNewForm(title:string, description: string): string {
    const forms = this.formSubject.getValue();

    const formId = 'form_' + new Date().getTime();

    const newForm = {
      id: formId,
      title,
      description,
      fields: [],
    }

    this.formSubject.next([...forms, newForm]);
    return formId;
  }

  addField(formId: string, field: FormField): boolean {
    const forms = this.formSubject.getValue();
    const formIndex = forms.findIndex((item) => item.id === formId);


    if (formIndex <= -1) {
      return false;
    }

    const updatedForm = [...forms];

    updatedForm[formIndex] = {
      ...forms[formIndex],
      fields: [...forms[formIndex].fields, field],
    }

    this.formSubject.next(updatedForm);
    return true;
  }

  removeField(formId: string, fieldId: string) {
    const forms = this.formSubject.getValue();
    const formIndex = forms.findIndex((item) => item.id === formId);

    if (!formIndex) {
      return false;
    }

    const updatedForm = forms[formIndex];

    const updatedFields = updatedForm.fields.filter((item) => item.id != fieldId);

    updatedForm.fields = updatedFields;

    const updatedForms = [
      ...forms,
      updatedForm
    ]

    this.formSubject.next(updatedForms)
    return true;

  }
}
