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

  onChange(event: any) {
    this.segment = event.detail.value;
  }
}
