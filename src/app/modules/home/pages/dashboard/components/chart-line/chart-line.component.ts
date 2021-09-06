import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { line } from '../../data';

@Component({
  selector: 'dash-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.css']
})
export class ChartLineComponent implements OnInit {

  // PARENT RECEIVED VARIABLE
  @Input() view!: any;
  @Input() data!: any;
  isBig = false;

  // DATA
  line: any[] = [];


  // options
  gradient = false;
  showXAxis = false;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Población';
  yAxisLabel = 'Peso (kg)';
  legendTitle = 'Leyenda';
  schemeType: any = 'ordinal';
  autoScale = true;
  colorScheme: any = {
    domain: ['#03335D', '#00A1E0', '#00A29E', '#CCFBFA']
  };


  constructor(private auth: AuthService,
    private ngZone: NgZone,
    private router: Router) {
    // GET DATA FROM .ts
    Object.assign(this, { line });
  }

  /**
   * Check Logged In or Redirect Login
   * @returns void
   */
  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      });
    }
    if (this.view === undefined) {
      this.isBig = true;
    }

    return;
  }

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
