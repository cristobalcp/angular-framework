import { Injectable, NgZone, OnInit } from '@angular/core';
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  sendPasswordResetEmail, sendEmailVerification, signOut, Auth
} from "firebase/auth";
import { Router } from "@angular/router";
import { User } from 'src/app/shared/services/user';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userData: any;
  public auth!: Auth;

  constructor(
    public router: Router,
    public ngZone: NgZone
  ) {
    this.initService();
    return;
  }

  /**
   * Inicia el Servicio de Auth de Firebase
   */
  private initService() {
    registerLocaleData(localeEs, 'es');    
    initializeApp(environment.firebase);
    this.auth = getAuth();
    this.auth.languageCode = navigator?.language?.split("-")[0]  || 'es';   
    return;
  }

  /**
   * Sign in process with email/password
   * @param  {string} email
   * @param  {string} password
   */
  SignIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        // SAVE USER DATA        
        this.SetUserData(result.user);

        // IF IS NOT VERIFIED DONT LOGIN
        if (result.user.emailVerified) {
          return this.ngZone.run(() => {
            this.router.navigate(['/home']);
            window.location.reload();
          });
        }

        return window.alert(`Por favor, verifique su correo electrónico mediante el Email que le hemos enviado a ${result.user.email}.`);

      }).catch((error: any) => {
        window.alert(error.message);

      });
  }

  /**
   * Sign up process with email/password
   * @param  {string} email
   * @param  {string} password
   */
  SignUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        // Email Verification
        sendEmailVerification(result.user);
        // Saves User Data in BBDD
        this.SetUserData(result.user);

        window.alert(`Se ha enviado un correo electrónico a ${result.user.email}, verifique su correo antes de continuar.`);
      }).catch((error: any) => {
        window.alert(error.message);
        localStorage.removeItem('user');
      });
  }

  /**
   * Reset Forgotten password of an Email
   * @param  {string} passwordResetEmail
   */
  ForgotPassword(passwordResetEmail: string) {
    return sendPasswordResetEmail(this.auth, passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error: any) => {
        window.alert(error);
      })
  }

  /**
   * Returns true when user is looged in and email is verified
   * @returns boolean
   */
  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user');    
    return (user !== null && JSON.parse(user)?.emailVerified) ? true : false;
  }


  /**
   * Setting up user data when: Sign in with 
   * username/password, Sign up with username/password
   * @param  {any} user
   */
  SetUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      createdAt: user.createdAt,
      emailVerified: user.emailVerified
    }

    localStorage.setItem('user', JSON.stringify(userData));
    return;
  }

  /**
   *  Sign out Actual User
   */
  SignOut() {
    return signOut(this.auth)
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }).catch((error: any) => {
        window.alert(error);
      });
  }

}