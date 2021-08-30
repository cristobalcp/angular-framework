import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService,
    private ngZone: NgZone,
    private router: Router){ }
  
  // Si el Usuario no esta Logged redirecciona a Login
  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      });
    }
    return;
  }

  // Cerrar sesión
  logOut() {
    this.auth.SignOut();
    return false;
    
  }

}
