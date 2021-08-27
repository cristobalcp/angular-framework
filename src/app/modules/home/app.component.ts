import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
  
  ngOnInit(): void {
    registerLocaleData(localeEs, 'es');    
    initializeApp(environment.firebase);
  }

  title = 'angular-framework';
}
