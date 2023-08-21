import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public getDocuments(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/DataPoint/GetDataPoints', { params: criteria })
  }

  public getDocument(id: number) {
    return this.http.get<any>('https://localhost:7094/Library/DataPoint/GetDataPoint', { params: { id } })
  }

  public putDocument(data: any) {
    return this.http.put('https://localhost:7094/Library/DataPoint/PutDataPoint', data);
  }

  public deleteDocument(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/DataPoint/DeleteDataPoint', { params: params });
  }
  
  constructor(public http: HttpClient) { }
}
