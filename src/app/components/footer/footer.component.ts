import { Component, HostListener } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatToolbarModule,MatGridListModule, MatIconModule, 
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  cols: number | undefined;

  constructor() {
    this.updateGridColumns(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateGridColumns((event.target as Window).innerWidth);
  }

  updateGridColumns(width: number) {
    if (width < 600) {
      this.cols = 1;  
    } else if (width < 960) {
      this.cols = 3;  
    } else {
      this.cols = 3;  
    }
  }
}