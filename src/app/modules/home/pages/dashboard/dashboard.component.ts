import { Component, OnInit } from '@angular/core';
import { multi, single } from './data';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  single: any[] = [];
  multi: any[] = [];

  view: any = [500, 300];

  // options
  gradient = false;
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Población';
  yAxisLabel = 'País';
  legendTitle = 'Leyenda';
  legendPosition:any = 'right';
  schemeType :any = 'ordinal';

  colorScheme : any = {
    domain: ['#03335D', '#00A1E0', '#00A29E', '#CCFBFA']
  };


  constructor() { 
    // GET DATA FROM .ts
    Object.assign(this, { multi });    
    Object.assign(this, { single });    
  }

  ngOnInit(): void {
  }

  onSelect(event :Event) {
    console.log(event);
  }

}
