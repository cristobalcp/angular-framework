import { Component, NgZone, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  url: SafeResourceUrl = this.transform_secure(environment.dash_url);
  
  constructor(private sanitized: DomSanitizer, 
    private ngZone: NgZone,
    private router: Router,
    private auth: AuthService) { }
  
  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      });
      return;
    }
  }

  transform_secure(value: string) :SafeResourceUrl{
    return this.sanitized.bypassSecurityTrustResourceUrl(value);
  }

}
