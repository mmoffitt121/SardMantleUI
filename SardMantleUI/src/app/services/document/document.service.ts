import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public getDocuments(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPoint/GetDataPoints', { params: criteria })
  }

  public getDocumentsFromWorld(criteria: any, world: string) {
    const headers = new HttpHeaders().set('WorldLocation', world)
    return this.http.get<any>(environment.baseUrl + '/Library/DataPoint/GetDataPoints', { params: criteria, headers: headers })
  }

  getDocumentsReferencingDocument(id: number) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPoint/GetDataPointsReferencingDataPoint', { params: {id} })
  }

  public getDocumentsCount(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPoint/GetDataPointsCount', { params: criteria })
  }

  public getDocument(id: number) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPoint/GetDataPoint', { params: { id } })
  }

  public putDocument(data: any) {
    return this.http.put(environment.baseUrl + '/Library/DataPoint/PutDataPoint', data);
  }

  public deleteDocument(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/DataPoint/DeleteDataPoint', { params: params });
  }

  public getFeatured() {
    return this.http.get(environment.baseUrl + '/Library/Featured/GetFeatured')
  }

  public getFeaturedFromWorld(worldLocation: string) {
    return this.http.get(environment.baseUrl + '/Library/Featured/GetFeaturedFromWorld', {params: {worldLocation}} )
  }

  public updateFeatured(featured: any[], worldLocation: string) {
    return this.http.post(environment.baseUrl + '/Library/Featured/UpdateFeatured', { featured, worldLocation });
  }
  
  constructor(public http: HttpClient) { }
}
