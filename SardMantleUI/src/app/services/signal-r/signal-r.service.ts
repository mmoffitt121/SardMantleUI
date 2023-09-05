import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  private progressSubject: Subject<{progress: number, message: string}> = new Subject<{progress: number, message: string}>();

  startConnection() {
    this.hubConnection = new HubConnectionBuilder().withUrl(environment.baseUrl + '/Progress').build();

    this.hubConnection.start().catch(error => console.error(error));

    this.hubConnection.on('progressUpdate', (progress: number, message: string) => {
      this.progressSubject.next({progress, message});
    });
  }

  getProgressUpdates() {
    return this.progressSubject.asObservable();
  }
  constructor() { }
}
