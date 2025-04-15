import { Component, inject, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { DynamicForm, FieldType, FormField } from "../../../types/field-model";
import { DynamicFormService } from "../../../services/dynamic-form.service";
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonContent,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonSelect,
	IonSelectOption,
	IonTextarea,
	IonToggle,
} from "@ionic/angular/standalone";
import { NgForOf, NgIf } from "@angular/common";

@Component({
	selector: "app-form-builder",
	templateUrl: "./form-builder.component.html",
	styleUrls: ["./form-builder.component.scss"],
	imports: [
		IonContent,
		IonCard,
		IonCardHeader,
		IonCardTitle,
		IonCardContent,
		IonItem,
		IonLabel,
		IonTextarea,
		IonButton,
		IonInput,
		IonSelect,
		IonSelectOption,
		IonToggle,
		IonList,
		IonIcon,
		NgIf,
		ReactiveFormsModule,
		NgForOf,
	],
})
export class FormBuilderComponent implements OnInit {
	formMetadataForm!: FormGroup;
	fieldForm!: FormGroup;

	currentFormId?: string;
	currentForm?: DynamicForm;

	fieldTypes: FieldType[] = [
		"text",
		"number",
		"email",
		"date",
		"select",
		"checkbox",
		"radio",
		"textarea",
	];

	private fb = inject(FormBuilder);
	private formService = inject(DynamicFormService);

	ngOnInit() {
		this.initForms();
	}

	initForms() {
		// Form for form metadata (title, description)
		this.formMetadataForm = this.fb.group({
			title: ["", Validators.required],
			description: [""],
		});

		// Form for adding fields
		this.fieldForm = this.fb.group({
			type: ["text", Validators.required],
			label: ["", Validators.required],
			name: ["", Validators.required],
			placeholder: [""],
			required: [false],
			options: [""],
			minLength: [""],
			maxLength: [""],
		});
	}

	createNewForm() {
		if (this.formMetadataForm.valid) {
			const { title, description } = this.formMetadataForm.value;
			this.currentFormId = this.formService.createNewForm(title, description);
			this.currentForm = this.formService.getForm(this.currentFormId);
		}
	}

	addField() {
		if (!this.currentFormId || !this.fieldForm.valid) {
			return;
		}

		const fieldData = this.fieldForm.value;

		const newField: FormField = {
			id: "field_" + new Date().getTime(),
			type: fieldData.type as FieldType,
			label: fieldData.label,
			name: fieldData.name,
			placeholder: fieldData.placeholder,
			required: fieldData.required,
			options: fieldData.options,
		};

		this.formService.addField(this.currentFormId, newField);
		this.currentForm = this.formService.getForm(this.currentFormId);

		this.fieldForm.reset({
			type: "text",
			required: false,
		});
	}
}
