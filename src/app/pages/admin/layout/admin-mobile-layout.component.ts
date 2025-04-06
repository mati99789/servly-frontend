import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-mobile-layout',
  standalone: true,
  imports: [RouterModule, IonicModule, FormsModule],
  templateUrl: './admin-mobile-layout.component.html',
})
export class AdminMobileLayoutComponent {
    segment = 'users';

    constructor(private router: Router, private route: ActivatedRoute) {}
  
    ngOnInit() {
      const current = this.router.url.split('/').pop();
      this.segment = current || 'users';
    }
  
    onChange(event: any) {
      const value = event.detail.value;
      this.segment = value;
      this.router.navigate(['../', value], { relativeTo: this.route });
    }
}
