import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  afAuth: any = false;

  public isActive: boolean = false;
  errorMessage = '';

  constructor(private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private auth: AuthService) {
      this.afAuth = getAuth();
     }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit() {
    console.log(localStorage.getItem('user'));
    
    if(this.auth.isLoggedIn){
      this.ngZone.run(() => {
        
        this.router.navigate(['/home']);
      })
    }
      
  }

  // Create User Email Passwordw
  createUser() {
    createUserWithEmailAndPassword(this.afAuth, this.loginForm.value.username, this.loginForm.value.password).then(() => {
      this.router.navigate(['/home']);
    }).catch((response : any) => {
      this.errorMessage = response.message;
    });
  }

  // Sign In Email-Password
  signIn() {
    signInWithEmailAndPassword(this.afAuth, this.loginForm.value.username, this.loginForm.value.password)
      .then(() => {
        // localStorage.setItem("user", "true");
        this.router.navigate(['/home']);
      }).catch((response : any) => {
        this.errorMessage = response.message;
      });
  }

  // Reset Forggot password
  ForgotPassword() {
    return sendPasswordResetEmail(this.afAuth, this.loginForm.value.username)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error :any) => {
        this.errorMessage = error;
      });
  }

  toggleInput() {
    return this.isActive = !this.isActive;
  }

}