import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  title = 'angular-framework';

  constructor(private auth: AuthService,
    private ngZone: NgZone,
    private router: Router) {
  }

  // Check si Log In, redirect Login si False
  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      });
    }
    return;
  }

  logOut() {
    this.auth.SignOut();
    return false;
  }
}
