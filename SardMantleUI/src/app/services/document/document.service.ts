import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public getDocuments(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/DataPoint/GetDataPoints', { params: criteria })
  }
  
  constructor(public http: HttpClient) { }
}
