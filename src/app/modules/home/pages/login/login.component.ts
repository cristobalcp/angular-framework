import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {
  // Variables
  @ViewChild('password') password! :ElementRef;
  public isActive: boolean = false;
  public errorMessage! : string;
  public loginForm : FormGroup = this.formBuilder.group({
    username: new FormControl("", [
      Validators.required,
      Validators.email
    ]), 
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]) 
  });

  // Constructor  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private auth: AuthService) {}

  
  // Check si Log In, redirect Home si True
  // Antes de ViewInit.
  ngOnInit() : void{
    if (this.auth.isLoggedIn) {
      this.ngZone.run(() => {
        this.router.navigate(['/home']);
      });
    }
    return;
  }

  // Despues de ViewInit
  ngAfterViewInit(): void {
    this.password.nativeElement.onpaste = function (evt: Event) { evt.preventDefault()};
    return;
  }

  // Crea User con Email+Password
  createUser() : void {
    this.auth.SignUp(this.loginForm.value.username, this.loginForm.value.password);
    return; 
  }

  // Iniciar Sesión con Email+Password
  signIn() : void {
    this.auth.SignIn(this.loginForm.value.username, this.loginForm.value.password);
    return;
  }

  // Reset Forgot password
  ForgotPassword() : void {
    this.auth.ForgotPassword(this.loginForm.value.username);
    return;
  }

  // Cambia el tipo de input del password, text/password
  toggleInput() : void {
    this.isActive = !this.isActive;
    return; 
  }

}