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
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { TableItem } from '../../models/admin';

@Component({
  selector: 'app-status-table',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './status-table.component.html',
  styleUrl: './status-table.component.css',
})
export class StatusTableComponent {
  @Input() totalItems: number = 0;
  // @Input() totalPages: number = 0;

  @Output() pageChange = new EventEmitter<{ page: number; limit: number }>();

  @Input() role!: string;

  @Input() adminsArray: TableItem[] = [];
  @Input() retailersArray: TableItem[] = [];
  @Output() emitterApprove = new EventEmitter<string>();
  @Output() emitterReject = new EventEmitter<string>();

  dataSource: MatTableDataSource<TableItem> = new MatTableDataSource();

  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input()
  searchedQueryNotFound!: string
  currentPage: number = 1;
  pageSize: number = 10;
  noOrganization: string = "-"
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.paginator) {
  //     console.log('inside if paginator');
  //     this.dataSource = new MatTableDataSource<Admin>(this.adminsArray);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   }
  //   if (changes['totalItems'] && this.paginator) {
  //     this.dataSource = new MatTableDataSource<Admin>(this.adminsArray);
  //     this.dataSource.paginator = this.paginator;
  //     console.log('totalItems', this.totalItems);
  //   }
  // }
  ngAfterViewInit(): void {
    if (this.dataSource) {
      console.log('in dataSource ngAfterViewInit');

      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminsArray'] || changes['retailersArray']) {
      if (this.adminsArray.length) {
        this.displayedColumns = [
          'username',
          'email',
          'contact_number',
          'status',
          '_id',
        ];
        this.dataSource = new MatTableDataSource(this.adminsArray);
      } else if (this.retailersArray.length) {
        this.displayedColumns = [
          'username',
          'email',
          'contact_number',
          'address',
          'status',
          '_id',
        ];
        this.dataSource = new MatTableDataSource(this.retailersArray);
      }
      this.dataSource.paginator = this.paginator;
    }
  }

get isRetailerPendingOrRejected() {
  return (element: any) =>
    element.role_specific_details?.approval?.[0]?.approval_status === 'pending' ||
    element.role_specific_details?.approval?.[0]?.approval_status === 'rejected';
}

get isRetailerPendingOrApproved() {
  return (element: any) =>
    element.role_specific_details?.approval?.[0]?.approval_status === 'pending' ||
    element.role_specific_details?.approval?.[0]?.approval_status === 'approved';
}

get isAdminPendingOrRejected() {
  return (element: any) =>
    element.role_specific_details?.approval_status === 'pending' ||
    element.role_specific_details?.approval_status === 'rejected';
}

get isAdminPendingOrApproved() {
  return (element: any) =>
    element.role_specific_details?.approval_status === 'pending' ||
    element.role_specific_details?.approval_status === 'approved';
}
}
