import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonInput, IonButton, IonList, IonItem, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/angular/standalone';  
  import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss'],
  imports: [IonCard, IonCardHeader, IonInput, IonButton, IonList, IonItem, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, FormsModule],
})
export class RegisterLoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
