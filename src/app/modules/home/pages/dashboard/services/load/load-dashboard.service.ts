import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoadDashboardService {

  data: any;

  constructor(private http: HttpClient) {
    return;
  }

  getData(): Observable<any> {
    return this.http.post('http://192.168.1.135:8080/dash', []);
  }
}
