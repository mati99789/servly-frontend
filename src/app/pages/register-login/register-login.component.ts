import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonCard, IonCardHeader, IonInput, IonButton, IonList, IonItem, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/angular/standalone';
  import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// TODO: Add form validation
@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss'],
  imports: [IonCard, IonCardHeader, IonInput, IonButton, IonList, IonItem, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, FormsModule],
})
export class RegisterLoginComponent  {


 authService = inject(AuthService);
 router = inject(Router);

 currentUser$ = this.authService.currentUser$;
 isLoggedIn$ = this.authService.isLoggedIn$;

  onSubmit(form: NgForm) {
    this.authService.register(form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
