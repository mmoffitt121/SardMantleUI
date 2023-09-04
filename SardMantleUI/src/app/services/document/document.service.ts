import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public getDocuments(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/DataPoint/GetDataPoints', { params: criteria })
  }

  public getDocumentsFromWorld(criteria: any, world: string) {
    const headers = new HttpHeaders().set('WorldLocation', world)
    return this.http.get<any>('https://localhost:7094/Library/DataPoint/GetDataPoints', { params: criteria, headers: headers })
  }

  getDocumentsReferencingDocument(id: number) {
    return this.http.get<any>('https://localhost:7094/Library/DataPoint/GetDataPointsReferencingDataPoint', { params: {id} })
  }

  public getDocumentsCount(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/DataPoint/GetDataPointsCount', { params: criteria })
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

  public getFeatured() {
    return this.http.get('https://localhost:7094/Library/Featured/GetFeatured')
  }

  public getFeaturedFromWorld(worldLocation: string) {
    return this.http.get('https://localhost:7094/Library/Featured/GetFeaturedFromWorld', {params: {worldLocation}} )
  }

  public updateFeatured(featured: any[], worldLocation: string) {
    return this.http.post('https://localhost:7094/Library/Featured/UpdateFeatured', { featured, worldLocation });
  }
  
  constructor(public http: HttpClient) { }
}
