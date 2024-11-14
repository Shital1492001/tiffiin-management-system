import { Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../models/chart-options';

@Component({
  selector: 'app-info-charts',
  standalone: true,
  imports: [NgApexchartsModule, MatCardModule],
  templateUrl: './info-charts.component.html',
  styleUrl: './info-charts.component.css',
})
export class InfoChartsComponent {
  @Input() role!: string;
  @Input() pending!: number;
  @Input() approved!: number;
  @Input() rejected!: number;
  // @Input() pedningRetailers!: number;
  // @Input() approvedRetailers!: number;
  // @Input() rejectedRetailers!: number;

  public chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      type: 'donut',
      width: '375',
    },
    labels: ['Pending', 'Approved', 'Rejected'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: 'bottom' },
        },
      },
    ],
  };

  ngOnChanges(changes: SimpleChanges) {
    this.chartOptions.series = [
      this.pending || 0,
      this.approved || 0,
      this.rejected || 0,
    ];
  }
}
