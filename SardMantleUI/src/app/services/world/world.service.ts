import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { World } from 'src/app/models/world/world';

@Injectable({
  providedIn: 'root'
})
export class WorldService {
  public getWorlds(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/World/GetWorlds', { params: criteria });
  }

  public getWorldCount(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/World/GetWorldCount', { params: criteria });
  }

  public postWorld(world: World) {
    return this.http.post('https://localhost:7094/Library/World/PostWorld', world);
  }

  public putWorld(world: World) {
    return this.http.put('https://localhost:7094/Library/World/PutWorld', world);
  }
  constructor(private http: HttpClient) { }
}
