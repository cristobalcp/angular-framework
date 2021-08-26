import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from 'src/app/core/authentication/authentication.service';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { initializeApp } from 'firebase/app';
import { AppComponent } from './app.component';


initializeApp(environment.firebase);
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent, 
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
