import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  public getDocumentTypes(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPointType/GetDataPointTypes', { params: criteria })
  }

  public getDocumentTypesCount(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPointType/GetDataPointTypesCount', { params: criteria })
  }

  public getDocumentType(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>(environment.baseUrl + '/Library/DataPointType/GetDataPointType', { params: params });
  }

  public postDocumentType(data: any) {
    return this.http.post(environment.baseUrl + '/Library/DataPointType/PostDataPointType', data);
  }

  public putDocumentType(data: any) {
    return this.http.put(environment.baseUrl + '/Library/DataPointType/PutDataPointType', data);
  }

  public deleteDocumentType(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/DataPointType/DeleteDataPointType', { params: params })
  }

  constructor(public http: HttpClient) { }
}
