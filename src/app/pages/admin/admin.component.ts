import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminDesktopLayoutComponent } from './layout/admin-desktop-layout.component';
import { AdminMobileLayoutComponent } from './layout/admin-mobile-layout.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [
    AsyncPipe,
    RouterModule,
    AdminDesktopLayoutComponent,
    NgIf,
    AdminMobileLayoutComponent,
    RouterOutlet
  ]
})
export class AdminComponent {
  responsiveService = inject(ResponsiveService);
  isMobile$ = this.responsiveService.isHandset$;
}
