import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  private path : string = "";
  constructor() { }

  ngOnInit(): void {
      this.path = "/";
  }
  
  getPath(): string { return this.path; }
}
