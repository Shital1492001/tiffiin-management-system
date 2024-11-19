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
import { Retailer } from '../../models/retailer';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

@Component({
  selector: 'app-retailer-status-table',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './retailer-status-table.component.html',
  styleUrl: './retailer-status-table.component.css',
})
export class RetailerStatusTableComponent {
  @Input() retailers: Retailer[] = [];
  @Input() totalItems: number = 0;
  @Input() totalPages: number = 0;
  @Output()
  emitterApprove = new EventEmitter<string>();

  @Output()
  emitterReject = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<{ page: number; limit: number }>();
  currentPage: number = 1;
  pageSize: number = 10;

  displayedColumns: string[] = [
    'username',
    'email',
    'contact_number',
    'address',
    'status',
    '_id',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Retailer>();
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.paginator) {
      console.log('inside if paginator');
      this.dataSource = new MatTableDataSource<Retailer>(this.retailers);
      this.dataSource.paginator = this.paginator;
    }
    if (changes['totalItems'] && this.paginator) {
      this.dataSource = new MatTableDataSource<Retailer>(this.retailers);
      this.dataSource.paginator = this.paginator;
      console.log('totalItems', this.totalItems);
    }
  }

  // ngOnChanges(): void {
  //   if (this.paginator) {
  //     console.log('inside if paginator');
  //     this.dataSource = new MatTableDataSource<Retailer>(this.retailers);
  //     this.dataSource.paginator = this.paginator;
  //   }
  //   if (this.totalItems && this.paginator) {
  //     this.dataSource = new MatTableDataSource<Retailer>(this.retailers);
  //     this.dataSource.paginator = this.paginator;
  //     console.log('totalItems', this.totalItems);
  //   }
  // }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      console.log('in dataSource ngAfterViewInit');

      this.dataSource.paginator = this.paginator;
    }

    if (this.paginator) {
      this.paginator.length = this.totalItems;
      console.log('AfterViewInit - Paginator length:', this.paginator.length);
    }
  }
  onPageChange(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
    console.log('emmitting');
    this.pageChange.emit({ page: pageIndex + 1, limit: pageSize });
  }

  get isPendingOrRejected() {
    return (element: any) =>
      element.role_specific_details.approval[0]?.approval_status ===
        'pending' ||
      element.role_specific_details.approval[0]?.approval_status === 'rejected';
  }

  get isPendingOrApproved() {
    return (element: any) =>
      element.role_specific_details.approval[0]?.approval_status ===
        'pending' ||
      element.role_specific_details.approval[0]?.approval_status === 'approved';
  }
}
