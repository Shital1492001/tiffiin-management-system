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
  @Input() pendingAdmins!: number;
  @Input() approvedAdmins!: number;
  @Input() rejectedAdmins!: number;

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
      this.pendingAdmins || 0,
      this.approvedAdmins || 0,
      this.rejectedAdmins || 0,
    ];
  }
}
