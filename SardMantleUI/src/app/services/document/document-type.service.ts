import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  public getDocumentTypes(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/DataPointType/GetDataPointTypes', { params: criteria })
  }

  public getDocumentType(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/DataPointType/GetDataPointType', { params: params });
  }

  public postDocumentType(location: any) {
    return this.http.post('https://localhost:7094/Library/DataPointType/PostDataPointType', location);
  }

  public putDocumentType(location: any) {
    return this.http.put('https://localhost:7094/Library/DataPointType/PutDataPointType', location);
  }

  public deleteDocumentType(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/DataPointType/DeleteDataPointType', { params: params })
  }

  constructor(public http: HttpClient) { }
}
