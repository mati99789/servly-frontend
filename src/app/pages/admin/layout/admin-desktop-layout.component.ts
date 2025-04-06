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
  styles: [`
    .admin-desktop-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .content-container {
      flex: 1;
      padding: 16px;
      overflow: auto;
    }
  `]
})
export class AdminDesktopLayoutComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const currentPath = this.router.url.split('/').pop();
    if (currentPath === 'settings') {
      setTimeout(() => this.onTabChange({ index: 1 }));
    }
  }

  onTabChange(event: any) {
    const tabs = ['users', 'settings'];
    const selectedTab = tabs[event.index];
    this.router.navigate(['/admin', selectedTab]);
  }
}
