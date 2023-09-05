import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'src/app/models/map/map';
import { UrlService } from '../url/url.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public getUrl(id: number, imageType: number) {
    return environment.baseUrl + '/Library/Image/GetImage?Id=' + id + '&Type=' + imageType + "&worldPath=" + this.urlService.getWorld();
  }

  public getImage(id: number, imageType: number) {
    let params = new HttpParams().set('Id', id).set('Type', imageType).set('worldPath', this.urlService.getWorld());
    return this.http.get<any>(environment.baseUrl + '/Library/Image/GetImage', { params: params, observe: 'response', responseType: 'blob' as 'json' });
  }

  public postImage(icon: File, id: number, imageType: number) {
    let formData = new FormData();
    formData.append('id', id.toString());
    formData.append('type', imageType.toString());
    formData.append('data', new Blob([icon], { type: icon.type }), "name");
    formData.append('url', this.getUrl(id, imageType));
    formData.append('worldPath', this.urlService.getWorld());
    return this.http.post(environment.baseUrl + '/Library/Image/PostImage', formData);
  }

  constructor(private http: HttpClient, private urlService: UrlService) { }
}
