import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  url: SafeResourceUrl = this.transform_secure(environment.dash_url);
  
  constructor(private sanitized: DomSanitizer) { }

  transform_secure(value: string) :SafeResourceUrl{
    return this.sanitized.bypassSecurityTrustResourceUrl(value);
  }

}
