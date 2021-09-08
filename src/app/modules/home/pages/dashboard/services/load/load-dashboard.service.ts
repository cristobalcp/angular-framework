import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoadDashboardService{
  private socket!: Socket;
  // private messages!: Array<any>;

  constructor() {
    this.connect();
  }
  
  //* CONNECT TO SOCKET
  connect(){
    this.socket = io('ws://127.0.0.1:8000');

    this.socket.on('connect', () => {
      this.socket.emit('start_stream');

      new Observable((observer) => {
        this.socket.on('update_data', (result) => {        
          console.log("result.data: ", result.data);
          
          observer.next(result.data);
        });
      });
    });
  }
  
  //* STOP CONNECTION
  stopData(){    
    this.socket.close();
    return;
  }

  //* CHARTS DATA OBSERVABLES
  chart1Data() {
    return new Observable((observer) => {
      this.socket.on('chart-1', (result) => {        
        observer.next(result.data);
      });
    });
  }

  chart2Data() {
    return new Observable((observer) => {
      this.socket.on('chart-2', (result) => {
        observer.next(result.data);
      });
    });
  }

  chart3Data() {
    return new Observable((observer) => {
      this.socket.on('chart-3', (result) => {
        observer.next(result.data);
      });
    });
  }

  chart4Data() {
    return new Observable((observer) => {
      this.socket.on('chart-4', (result) => {
        observer.next(result.data);
      });
    });
  }

  chart5Data() {
    return new Observable((observer) => {
      this.socket.on('chart-5', (result) => {
        observer.next(result.data);
      });
    });
  }
    //* FIN CHARTS DATA OBSERVABLES
}
