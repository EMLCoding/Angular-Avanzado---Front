import { Component, OnInit, Input} from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
})
export class GraficoDonaComponent implements OnInit {

  @Input() doughnutChartLabels: Label[] = [];
  @Input() doughnutChartData: MultiDataSet = [];
  @Input() doughnutChartType = '';

  constructor() { }

  ngOnInit() {
  }

}
