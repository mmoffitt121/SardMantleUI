import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public get() {
    return this.http.get<any>(environment.baseUrl + '/Library/Task/GetTasks');
  }

  public cancel(taskId: string) {
    let params = new HttpParams().set("TaskId", taskId);
    return this.http.delete(environment.baseUrl + '/Library/Task/CancelTask', {params});
  }
  constructor(private http: HttpClient) { }
}
