import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public importWorldData(world: string) {
    return this.http.post(environment.baseUrl + '/Map/WorldImport/Import', {world: world});
  }
}
