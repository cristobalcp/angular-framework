import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  hideNav : Boolean = false;
  title = 'angular-framework';

  constructor(private auth : AuthService, 
    private router: Router){
      // Event Cambio de Ruta 
      this.router.events.subscribe((val) => {
        if(val instanceof NavigationEnd){
          if(val.urlAfterRedirects === '/login'){
            this.hideNav = true;
            return;
          }
          if(this.auth.isLoggedIn){
            this.hideNav = false;
            return;
          }
        }
  });
    
  }
}