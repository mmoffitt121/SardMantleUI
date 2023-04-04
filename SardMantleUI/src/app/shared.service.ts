import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  /*readonly APIUrl = "https://localhost:7094";
  constructor(private http:HttpClient) { }

  getMaps():Observable<any[]>
  {
    return this.http.get<any>(this.APIUrl + "/Library/Map")
  }

  postMap(val:any)
  {
    return this.http.post(this.APIUrl + "/Library/Map", val)
  }

  putMap(val:any)
  {
    return this.http.put(this.APIUrl + "/Library/Map", val)
  }

  deleteMap(val:any)
  {
    return this.http.delete(this.APIUrl + "/Library/Map/" + val)
  }*/
}
