import { Component, OnInit } from '@angular/core';
import {IonContent, IonHeader, IonList, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {FormBuilderComponent} from "../form-builder/form-builder.component";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  imports: [
    IonContent,
    FormBuilderComponent
  ]
})
export class DynamicFormComponent {

  constructor() { }

}
