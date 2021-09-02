import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { multi, single } from '../../data';

@Component({
  selector: 'dash-chart-1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})

export class ChartOneComponent implements OnInit {
  
  // DATA
  single: any[] = [];
  multi: any[] = [];

  
  // options
  view: any = [500, 300];
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


  constructor(private auth: AuthService,
    private ngZone: NgZone,
    private router: Router) { 
    // GET DATA FROM .ts
    Object.assign(this, { multi });    
    Object.assign(this, { single });    
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
    return;
  }

  onSelect(event :Event) {
    console.log(event);
  }

}
