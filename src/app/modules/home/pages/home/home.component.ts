import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  url: string = environment.dash_url;
  constructor() {}

}
