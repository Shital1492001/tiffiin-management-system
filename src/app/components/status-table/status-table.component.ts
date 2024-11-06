import { AfterViewInit, Component, Input, SimpleChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { admin } from '../../models/admin';
@Component({
  selector: 'app-status-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './status-table.component.html',
  styleUrl: './status-table.component.css',
})
export class StatusTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    '_id',
    'username',
    'email',
    'contact_number',
    'organization_name',
    'approval_status',
  ];
  dataSource!: MatTableDataSource<admin>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @Input()
  pendingAdminsArray: admin[] = [];
  // why ngOnInit-datasource cannot be initiallized outside method or constructor
  // ngOnInit(): void {
  //   this.dataSource = new MatTableDataSource<admin>(this.pendingAdminsArray);
  //   console.log('in ngOnInit of status-table', this.pendingAdminsArray);
  // }
  // why ngOnChanges --- bcz ngOnInit willrun only one time after component is initialized
  // and first time pendingAdminsArray is empty so data did not render on the
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pendingAdminsArray']) {
      this.dataSource = this.dataSource = new MatTableDataSource<admin>(
        this.pendingAdminsArray
      );
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
