import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'src/app/models/map/map';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public getUrl(id: number, imageType: number) {
    return 'https://localhost:7094/Library/Image/GetImage?Id=' + id + '&Type=' + imageType;
  }

  public getImage(id: number, imageType: number) {
    let params = new HttpParams().set('Id', id).set('Type', imageType);
    return this.http.get<any>('https://localhost:7094/Library/Image/GetImage', { params: params, observe: 'response', responseType: 'blob' as 'json' });
  }

  public postImage(icon: File, id: number, imageType: number) {
    let formData = new FormData();
    formData.append('id', id.toString());
    formData.append('type', imageType.toString());
    formData.append('data', new Blob([icon], { type: icon.type }), "name");
    return this.http.post('https://localhost:7094/Library/Image/PostImage', formData);
  }

  constructor(private http: HttpClient) { }
}
