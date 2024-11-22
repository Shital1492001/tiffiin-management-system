import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Admin } from '../../models/admin';
import { MatIconModule } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { AdminActionDialogComponent } from '../admin-action-dialog/admin-action-dialog.component';
@Component({
  selector: 'app-status-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSort,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './status-table.component.html',
  styleUrl: './status-table.component.css',
})
export class StatusTableComponent implements AfterViewInit {

  constructor(private dialog: MatDialog) { }
  displayedColumns: string[] = [
    'username',
    'email',
    'contact_number',
    'organization_name',
    'approval_status',
    '_id',
  ];
  dataSource: MatTableDataSource<Admin> = new MatTableDataSource<Admin>([]);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input()
  adminsArray: Admin[] = [];
  @Input() totalItems: number = 0;
  @Input() totalPages: number = 0;
  @Output()
  emitterApprove = new EventEmitter<string>();
  @Output()
  emitterReject = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<{ page: number; limit: number }>();
  @Input()
  searchedQueryNotFound!: string
  currentPage: number = 1;
  pageSize: number = 10;
  noOrganization: string = "-"
  ngOnChanges(changes: SimpleChanges): void {
    if (this.paginator) {
      console.log('inside if paginator');
      this.dataSource = new MatTableDataSource<Admin>(this.adminsArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    if (changes['totalItems'] && this.paginator) {
      this.dataSource = new MatTableDataSource<Admin>(this.adminsArray);
      this.dataSource.paginator = this.paginator;
      console.log('totalItems', this.totalItems);
    }
  }
  ngAfterViewInit(): void {
    if (this.dataSource) {
      console.log('in dataSource ngAfterViewInit');

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
  openDialog(
    elementId: string,
    title: string,
    message: string,
    includeMessage: boolean,
    eventEmitter: EventEmitter<any>
  ): void {
    console.log("includeMessage", includeMessage);
    const dialogRef = this.dialog.open(AdminActionDialogComponent, {
      data: {
        title,
        message,
        includeMessage,
      },
      width: '352px',
      height: '144px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'yes') {
        if (includeMessage) {
          console.log(
            `Action: ${title}, Item: ${elementId}, Message: ${result.message}`
          );
          eventEmitter.emit({ id: elementId, message: result.message });
        } else {
          console.log(`Action: ${title}, Item: ${elementId}`);
          eventEmitter.emit(elementId);
        }
      } else if (result?.action === 'no') {
        console.log(`User chose not to proceed with ${title}.`);
      }
    });
  }
  onReject(elementId: string): void {
    this.openDialog(
      elementId,
      'Reject Item',
      'Are you sure you want to reject this item?',
      false,
      this.emitterReject
    );
  }

  onApprove(elementId: string): void {
    this.openDialog(
      elementId,
      'Approve Item',
      'Are you sure you want to approve this item?',
      false,
      this.emitterApprove
    );
  }
}
