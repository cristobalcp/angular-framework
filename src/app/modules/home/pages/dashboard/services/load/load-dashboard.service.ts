import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class LoadDashboardService {

  data: any;
  private socket!: Socket;
  private messages!: Array<any>;

  constructor(private http: HttpClient, private sanitized: DomSanitizer) {
    // CONNECT TO SOCKET
    this.socket = io('http://127.0.0.1:5000/', { transports: ['websocket'], upgrade: false });

    this.socket.on('connect', () => {
      this.socket.emit('start_stream', { data: "chart-1" });
      this.socket.emit('start_stream', { data: "chart-2" });
      this.socket.emit('start_stream', { data: "chart-3" });
      this.socket.emit('start_stream', { data: "chart-4" });
      this.socket.emit('start_stream', { data: "chart-5" });
    });

  }

  getData(): any {
    return this.http.get('http://192.168.1.135:8080/dash').subscribe((data) => {
      console.log('data: ', data);

    });
  }

  // EMITTER example
  sendMessage(msg: string) {
    this.socket.emit('new-message-client', { message: msg });
  }

  // HANDLER example
  chart1() {
    return new Observable((observer) => {
      this.socket.on('chart-1', (result) => {
        observer.next(result.data);
      });
    });
  }

  // HANDLER example
  chart2() {
    return new Observable((observer) => {
      this.socket.on('chart-2', (result) => {
        observer.next(result.data);
      });
    });
  }

  // HANDLER example
  chart3() {
    return new Observable((observer) => {
      this.socket.on('chart-3', (result) => {
        observer.next(result.data);
      });
    });
  }

  // HANDLER example
  chart4() {
    return new Observable((observer) => {
      this.socket.on('chart-4', (result) => {
        observer.next(result.data);
      });
    });
  }

  // HANDLER example
  chart5() {
    return new Observable((observer) => {
      this.socket.on('chart-5', (result) => {
        observer.next(result.data);
      });
    });
  }
}
