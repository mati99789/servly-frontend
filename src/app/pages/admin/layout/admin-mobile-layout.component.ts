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
    segment = 'dynamic-form';

    constructor(private router: Router, private route: ActivatedRoute) {}



    onChange(event: any) {
      const value = event.detail.value;
      this.segment = value;
      this.router.navigate(['../', value], { relativeTo: this.route });
    }
}
