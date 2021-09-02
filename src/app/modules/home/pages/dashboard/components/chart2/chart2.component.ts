import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { gauge } from '../../data';

@Component({
  selector: 'dash-chart-2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {

  // DATA
  gauge: any[] = [];

  // options
  view: any = [500, 300];
  showLegend = false;
  minimo = 0;
  maximo = 20;
  units = 'm/s';
  bigSegments = 8;
  smallSegments = 5;
  schemeType: any = 'ordinal';
  colorScheme: any = {
    domain: ['#03335D', '#00A1E0', '#00A29E', '#CCFBFA']
  };


  constructor(private auth: AuthService,
    private ngZone: NgZone,
    private router: Router) {
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

    // GET EXPORTED DATA FROM .ts
    Object.assign(this, { gauge });
    return;
  }

  /**
   * On Select Chart
   * @param  {Event} event
   */
  onSelect(event: Event) {
    console.log(event);
  }
}
