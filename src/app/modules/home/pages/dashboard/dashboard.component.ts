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

    // this.getData();
    this.dataService.chart1().subscribe((data :any) => {   
      console.log("Nuevos datos Chart1: ", data);
        if(data[0]["series"].length > 0){
          this.dataChart1 = data;
        }
    });

    this.dataService.chart2().subscribe((data :any) => {   
      console.log("Nuevos datos Chart2: ", data);
        if(data[0]["series"].length > 0){
          this.dataChart2 = data;
        }
    });
    this.dataService.chart3().subscribe((data :any) => {   
      console.log("Nuevos datos Chart3: ", data);
        if(data[0]["series"].length > 0){
          this.dataChart3 = data;
        }
    });
    this.dataService.chart4().subscribe((data :any) => {   
      console.log("Nuevos datos Chart4: ", data);
        if(data[0]["series"].length > 0){
          this.dataChart4 = data;
        }
    });
    this.dataService.chart5().subscribe((data :any) => {   
      console.log("Nuevos datos Chart5: ", data);
        if(data[0]["series"].length > 0){
          this.dataChart5 = data;
        }
    });

    return;
  }

  private getData() {
    // GET DATA 1
    this.dataService.getData().subscribe((result: any) => {

      for (let i = 0; i < result.length; i++) {
        
        switch (i) {
          case 0:
            this.dataChart1 = result[i];
            break;
          case 1:
            this.dataChart2 = result[i];
            break;
          case 2:
            this.dataChart3 = result[i];
            break;
          case 3:
            this.dataChart4 = result[i];
            break;
          case 4:
            this.dataChart5 = result[i];
            break;
          default:
            break;
        }

      }

      this.loading = false;
      return;
    });
  }

  sendButtonClick() {
    this.dataService.sendMessage("TESTING SEND");
  }


}
