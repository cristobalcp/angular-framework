import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public isActive: boolean = false;
  public errorMessage : string = '';

  public loginForm : FormGroup = this.fb.group({
    username: new FormControl("", [
      Validators.required,
      Validators.email
    ]), 
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]) 
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private auth: AuthService) {
  }

  // Check si Log In, redirect Home si True
  ngOnInit() {
    if (this.auth.isLoggedIn) {
      this.ngZone.run(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  // Crea User con Email+Password
  createUser() {
    return this.auth.SignUp(this.loginForm.value.username, this.loginForm.value.password);
  }

  // Iniciar Sesión con Email+Password
  signIn() {
    this.auth.SignIn(this.loginForm.value.username, this.loginForm.value.password);
    return;
  }

  // Reset Forgot password
  ForgotPassword() {
    this.auth.ForgotPassword(this.loginForm.value.username);
    return;
  }

  // Cambia el tipo de input del password, text/password
  toggleInput() {
    return this.isActive = !this.isActive;
  }
}