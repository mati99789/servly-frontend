import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-admin-desktop-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatTabsModule
  ],
  templateUrl: './admin-desktop-layout.component.html',
  styleUrls: ['./admin-layout.scss']
})
export class AdminDesktopLayoutComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}



  onTabChange(event: any) {
    const tabs = ['users', 'dynamic-form'];
    const selectedTab = tabs[event.index];
    this.router.navigate(['/admin', selectedTab]);
  }
}
