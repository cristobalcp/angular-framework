import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular-framework';

  constructor(){
    localStorage.clear();
    console.log("Limpiando: ", localStorage.getItem("user"));
    
  }
}
