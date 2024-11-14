import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Admin } from '../../models/admin';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-retailer-card',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './retailer-card.component.html',
  styleUrl: './retailer-card.component.css',
})
export class RetailerCardComponent {
  @Input() retailers: Admin[] = [];
  @Input() status: string = '';
  @Output()
  emitterApprove = new EventEmitter<string>();

  @Output()
  emitterReject = new EventEmitter<string>();

  displayedColumns: string[] = [
    'username',
    'email',
    'contact_number',
    'address',
    'status',
    '_id',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Admin>();
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    //console.log('status', this.status);
    console.log('retailers.....', this.retailers);
    if (changes['retailers'] && changes['retailers'].currentValue) {
      console.log('Updating table data in child component');
      this.dataSource.data = changes['retailers'].currentValue;
      this.dataSource.paginator = this.paginator;
      console.log('Updated data source:', this.dataSource.data);
    }
  }
}
