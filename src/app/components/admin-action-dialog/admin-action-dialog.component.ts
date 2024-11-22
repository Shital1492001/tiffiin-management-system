import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admin-action-dialog',
  standalone: true,
  imports: [MatFormField, MatLabel, FormsModule, MatButtonModule],
  templateUrl: './admin-action-dialog.component.html',
  styleUrl: './admin-action-dialog.component.css'
})
export class AdminActionDialogComponent {
  userMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<AdminActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close({ action: 'no' });
  }

  onYesClick(): void {
    this.dialogRef.close({ action: 'yes', message: this.userMessage });
  }
}
