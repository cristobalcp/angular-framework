import { Injectable, NgZone } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  sendPasswordResetEmail, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { Router } from "@angular/router";
import { User } from 'src/app/shared/services/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  public auth : any;

  constructor(
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.auth = getAuth();
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.SetUserData(result.user);
      }).catch((error: any) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.SetUserData(result.user);
      }).catch((error: any) => {
        window.alert(error.message)
      })
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: any) {
    return sendPasswordResetEmail(this.auth, passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error: any) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(`${localStorage.getItem('user')}`);
    console.log("user: ", user, localStorage.getItem('user'));
    
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
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

  // Sign out 
  SignOut() {

    localStorage.setItem('user', 'false');
    
    console.log("adios,",  localStorage.getItem('user'));

    return signOut(this.auth).then(() => {
      
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1000);

    }).catch((error: any)=>{
      console.log(error);
    
    });
  }

}