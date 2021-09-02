import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  private path : string = "";
  
  constructor(private auth: AuthService,
    private ngZone: NgZone,
    private router: Router) { }
  
  // Check si Logged In, redirect Login si False
  ngOnInit(): void {
    this.path = "/";
    return;
  }
  
  logOut() {
    this.auth.SignOut();
    return false;
  }

  getPath(): string { return this.path; }
}
