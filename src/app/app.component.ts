import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddorganizationComponent } from './components/addorganization/addorganization.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AddorganizationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Tiffin_Management_System';
}
