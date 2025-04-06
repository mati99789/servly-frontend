import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ResponsiveService } from 'src/app/services/responsive.servivce.';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminDesktopLayoutComponent } from './layout/admin-desktop-layout.component';
import { AdminMobileLayoutComponent } from './layout/admin-mobile-layout.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [
    AsyncPipe,
    RouterModule,
    RouterOutlet,
    AdminDesktopLayoutComponent,
    AdminMobileLayoutComponent
  ]
})
export class AdminComponent{

  responsiveService = inject(ResponsiveService);
  isMobile$ = this.responsiveService.isHandset$;


}
