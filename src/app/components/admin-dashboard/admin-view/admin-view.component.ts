import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RejectedAdminViewComponent } from '../rejected-admin-view/rejected-admin-view.component';
import { PendingAdminViewComponent } from '../pending-admin-view/pending-admin-view.component';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    RejectedAdminViewComponent,
    PendingAdminViewComponent,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css',
})
export class AdminViewComponent {
  constructor(private authService: AuthService) {}
  userStatus: string | null = null;
  getUserByToken() {
    const userByToken = this.authService.getUserTypeByToken();
    userByToken.subscribe({
      next: (userData) => {
        this.userStatus = userData.data.role_specific_details.approval_status;
      },
      error: () => {},
    });
  }

  ngOnInit(): void {
    this.getUserByToken();
  }
}
