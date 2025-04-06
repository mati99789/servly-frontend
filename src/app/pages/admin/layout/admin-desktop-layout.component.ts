import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-admin-desktop-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatTabsModule
  ],
  templateUrl: './admin-desktop-layout.component.html',
})
export class AdminDesktopLayoutComponent {}
