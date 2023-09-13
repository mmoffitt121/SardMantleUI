import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { World } from 'src/app/models/world/world';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorldService {
  public getWorlds(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/World/GetWorlds', { params: criteria });
  }

  public getWorldCount(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/World/GetWorldCount', { params: criteria });
  }

  public postWorld(world: World) {
    return this.http.post(environment.baseUrl + '/Library/World/PostWorld', world);
  }

  public putWorld(world: World) {
    return this.http.put(environment.baseUrl + '/Library/World/PutWorld', world);
  }
  constructor(private http: HttpClient) { }
}
