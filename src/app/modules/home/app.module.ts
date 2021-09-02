import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent, 
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
