import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @ViewChild("dash") dash!: ElementRef;
  @ViewChild("home") home!: ElementRef;

  constructor(private auth: AuthService,
      private router: Router){

        // Event Cambio de Ruta (Sin hacer click en menu directamente) 
        this.router.events.subscribe((val) => {          
          if(val instanceof NavigationEnd){
              this.toggleActive(val.urlAfterRedirects.replace("/", ""));
              return;
          }
    });
      
  }
  
  // Cerrar sesión
  logOut() {
    this.auth.SignOut();
    return false;
  }

  // Set Active Menu Section
  toggleActive(id: string) {    
    document.querySelector('a.nav-link.active')?.classList.remove('active');
    document.getElementById(id)?.classList.add('active');
    return;
  }



}