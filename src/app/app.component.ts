import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import {
  IonApp, IonSplitPane, IonMenu, IonContent, IonList,
  IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { AsyncPipe } from "@angular/common";
import { combineLatest, map, Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
import { routes } from "./app.routes";



import {
  mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp,
  archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp,
  bookmarkOutline, bookmarkSharp, logInOutline, logInSharp, logOutOutline, logOutSharp,
  homeSharp, homeOutline, personAddOutline, personAddSharp,
  shieldOutline, shieldSharp
} from 'ionicons/icons';
import {MenuItem, RouteData} from "./types/route.types";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList,
    IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, AsyncPipe
  ],
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  appPagesFiltered: Observable<MenuItem[]> = combineLatest([
    this.authService.isLoggedIn$,
    this.authService.isAdmin$
  ]).pipe(
    map(([isLoggedIn, isAdmin]) => {
      const routeMenuItems = routes
        .filter(route => {
          const data = route.data as RouteData;
          if (!data || !data.showInMenu) return false;

          // Filter based on auth status
          if (data.requiresAuth && !isLoggedIn) return false;
          if (!data.requiresAuth && isLoggedIn) return false;

          // Filter admin-only routes
          if (data.adminOnly && !isAdmin) return false;

          return true;
        })
        .map(route => ({
          title: (route.data as RouteData).title,
          url: '/' + route.path,
          icon: (route.data as RouteData)?.icon || this.getDefaultIcon(route.path)
        } as MenuItem));

      // Add logout option if logged in
      if (isLoggedIn) {
        const logoutItem: MenuItem = {
          title: 'Logout',
          url: '/logout',
          icon: 'log-out',
          function: 'logout'
        };
        routeMenuItems.push(logoutItem);
      }

      return routeMenuItems;
    })
  );

  constructor() {
    addIcons({
      mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp,
      archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp,
      bookmarkOutline, bookmarkSharp, logInOutline, logInSharp, logOutOutline, logOutSharp,
      homeOutline, homeSharp, personAddOutline, personAddSharp,
      shieldOutline, shieldSharp
    });
  }

  private getDefaultIcon(path: string | undefined): string {
    switch (path) {
      case 'home': return 'home';
      case 'admin': return 'shield';
      case 'login': return 'log-in';
      case 'register': return 'person-add';
      default: return 'document'; // Default icon
    }
  }

  handleFunction(functionName: string): void {
    switch (functionName) {
      case 'logout':
        this.logout();
        break;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
