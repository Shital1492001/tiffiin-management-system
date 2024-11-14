import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-action-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './action-dialog.component.html',
  styleUrl: './action-dialog.component.css',
})
export class ActionDialogComponent {
  @Input() title!: string;
  @Input() message!: string;
}
