import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,RouterModule],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  menuItemClicked() {
    this.isMenuOpen = false; 
  }

}
