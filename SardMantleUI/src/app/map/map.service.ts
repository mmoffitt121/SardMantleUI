import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public getLocations(criteria: any) {
    return this.http.get<any[]>('https://localhost:7094/Library/LocationType/GetLocations', { params: criteria }).pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  constructor(private http: HttpClient) { }
}
