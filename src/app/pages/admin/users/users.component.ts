import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ResponsiveService } from 'src/app/services/responsive.servivce.';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, AsyncPipe, NgIf],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  private responsiveService = inject(ResponsiveService);
  isMobile$ = this.responsiveService.isHandset$;


}
