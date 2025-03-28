import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonCard, IonCardHeader, IonInput, IonButton, IonList, IonItem, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonCard, IonCardHeader, IonInput, IonButton, IonList, IonItem, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, FormsModule],
})
export class LoginFormComponent {

  authService = inject(AuthService);
  router = inject(Router);

  currentUser$ = this.authService.currentUser$;
  isLoggedIn$ = this.authService.isLoggedIn$;

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
