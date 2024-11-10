import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { admin } from '../../models/admin';
import { MatIconModule } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-status-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSort,
    MatFormFieldModule,
  ],
  templateUrl: './status-table.component.html',
  styleUrl: './status-table.component.css',
})
export class StatusTableComponent implements AfterViewInit {
  applyFilter(arg0: any) {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = [
    'username',
    'email',
    'contact_number',
    'organization_name',
    'approval_status',
    '_id',
  ];
  dataSource!: MatTableDataSource<admin>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input()
  adminsArray: admin[] = [];
  @Output()
  emitterApprove = new EventEmitter<string>();
  @Output()
  emitterReject = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<{ page: number; limit: number }>();
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminsArray']) {
      this.dataSource = new MatTableDataSource<admin>(this.adminsArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onPageChange(event: any): void {
    const { pageIndex, pageSize } = event;
    this.pageChange.emit({ page: pageIndex + 1, limit: pageSize });
  }
}
