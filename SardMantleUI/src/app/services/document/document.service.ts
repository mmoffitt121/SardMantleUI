import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DataPointQueryResult } from 'src/app/models/document/document-query-result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public getNew(typeId: number) {
    return this.http.get<DataPointQueryResult>(environment.baseUrl + '/Library/DataPoint/GetEmptyDataPoint', { params: {typeId} })
  }

  public getDocuments(criteria: any) {
    return this.http.post<any>(environment.baseUrl + '/Library/DataPoint/GetDataPoints', criteria).pipe(map(result => {
      result.results.forEach((d: any) => {
        d.parameters.forEach((p: any) => {
          if (p.typeParameterTypeValue == 'bit') {
            p.value = (p.value != undefined) ? (p.value.toLowerCase() == "true") : (undefined)
          }
        });
      });
      return result;
    }));
  }

  public getDocumentsFromWorld(criteria: any, world: string) {
    const headers = new HttpHeaders().set('WorldLocation', world)
    return this.http.get<any>(environment.baseUrl + '/Library/DataPoint/GetDataPoints', { params: criteria, headers: headers })
  }

  getDocumentsReferencingDocument(id: number) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPoint/GetDataPointsReferencingDataPoint', { params: {id} })
  }

  public getDocumentsCount(criteria: any) {
    return this.http.post<any>(environment.baseUrl + '/Library/DataPoint/GetDataPointsCount', criteria)
  }

  public getDocument(id: number) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPoint/GetDataPoint', { params: { id } }).pipe(map(result => {
      result.parameters.forEach((p: any) => {
        if (p?.timeValueString) {
          p.timeValue = BigInt(p.timeValueString);
        }
      })
      return result;
    }))
  }

  public putDocument(data: any) {
    data.parameters.forEach((param: any) => param.valueData = undefined);
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
