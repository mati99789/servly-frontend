import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonInput, IonButton, IonList, IonItem, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/angular/standalone';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonCard, IonCardHeader, IonInput, IonButton, IonList, IonItem, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle],
})
export class LoginFormComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
