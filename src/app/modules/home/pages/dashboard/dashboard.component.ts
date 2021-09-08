import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { LoadDashboardService } from './services/load/load-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService,
    private ngZone: NgZone,
    private router: Router,
    private dataService: LoadDashboardService,) {
  }
  dataChart1!: Array<Object>;
  dataChart2!: Array<Object>;
  dataChart3!: Array<Object>;
  dataChart4!: Array<Object>;
  dataChart5!: Array<Object>;
  stopped = false;
  loading = false;

  view: any = [400, 350];
  legendPosittion = "bellow";

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

    // SUBSCRIBE TOP CHARTS OBSERVABLES
    this.dataService.chart1Data().subscribe((data: any) => {
      console.log(data, typeof(data));
      
        if (data[0]["series"].length > 0) {
          this.dataChart1 = data;
        }
        return;
      }, (error) => {
        console.warn("Error cargando grafico 1: ", error);
        return;
    });

    this.dataService.chart2Data().subscribe((data: any) => {
      if (data[0]["series"].length > 0) {
        this.dataChart2 = data;
      }
    }, (error) => {
        console.warn("Error cargando grafico 2: ", error);
        return;
    });

    this.dataService.chart3Data().subscribe((data: any) => {
      if (data[0]["series"].length > 0) {
        this.dataChart3 = data;
      }
    }, (error) => {
        console.warn("Error cargando grafico 3: ", error);
        return;
    });

    this.dataService.chart4Data().subscribe((data: any) => {
      if (data[0]["series"].length > 0) {
        this.dataChart4 = data;
      }
    }, (error) => {
        console.warn("Error cargando grafico 4: ", error);
        return;
    });

    this.dataService.chart5Data().subscribe((data: any) => {
      if (data[0]["series"].length > 0) {
        this.dataChart5 = data;
      }
    }, (error) => {
        console.warn("Error cargando grafico 5: ", error);
        return;
    });

    return;
  }
}
