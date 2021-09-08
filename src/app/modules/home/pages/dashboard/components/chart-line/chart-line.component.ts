import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'dash-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.css']
})

// CLASE del COMPONENTE CHART LINE
export class ChartLineComponent implements OnInit {

  // PARENT VARIABLEs
  @Input() data!: any;
  @Input() view!: any;
  isBig : boolean = false;

  // options
  gradient : boolean = false;
  showXAxis : boolean = false;
  showYAxis : boolean = true;
  showLegend : boolean = false;
  showXAxisLabel : boolean = true;
  showYAxisLabel : boolean = true;
  autoScale : boolean = true;
  xAxisLabel : any = 'Población';
  yAxisLabel : any = 'Peso (kg)';
  legendTitle : any = 'Leyenda';
  schemeType: any = 'ordinal';
  colorScheme: any = {
    domain: ['#03335D', '#00A1E0']
  };

  constructor() {}

  /**
   * Check Logged In or Redirect Login
   * @returns void
   */
  ngOnInit(): void {
    if (this.view === undefined) {
      this.isBig = true;
    }

    return;
  }

  /**
   * On Select Chart Line Compontent Event
   * @param  {Event} event
   */
  onSelect(event: Event) {
    console.log(event);
  }

  /**
   * Evento Resize de la Ventana del Navegador (RESPONSIVENESS)
   * @param  {Event} event
   */
  onResize(event: Event) {
    const wind = event.target as Window;
    if (this.isBig) {
      // CHARTS PESO
      this.view = [wind.innerWidth / 2.1, 400];
    } else {
      // CHARTS VELOCIDAD
      this.view = [wind.innerWidth / 3.1, 350];
    }
  }
}