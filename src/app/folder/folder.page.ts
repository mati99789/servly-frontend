import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { User } from '../dtos/user';
import { NgIf, AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, NgIf, AsyncPipe],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);

  currentUser$ = this.authService.currentUser$;
  isLoggedIn$ = this.authService.isLoggedIn$;


  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.currentUser$.subscribe((user) => {
      console.log(user);
    });

    this.isLoggedIn$.subscribe((isLoggedIn) => {
      console.log(isLoggedIn);
    });
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
