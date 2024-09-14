import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'src/app/models/map/map';
import { UrlService } from '../url/url.service';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/models/content/image';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public getUrl(id: number, imageType: number) {
    return environment.baseUrl + '/Library/Image/GetImage?Id=' + id + '&Type=' + imageType + "&worldPath=" + this.urlService.getWorld();
  }

  public getImages(criteria: any) {
    return this.http.get<Image[]>(environment.baseUrl + '/Library/Image/GetImages', {params: criteria});
  }

  public getImageCount(criteria: any) {
    return this.http.get<number>(environment.baseUrl + '/Library/Image/GetImageCount', {params: criteria});
  }

  public image(id: string) {
    return this.http.get(environment.baseUrl + '/Library/Image/Image', { params: {id}, responseType: "blob" });
  }

  public thumbnail(id: string) {
    return this.http.get(environment.baseUrl + '/Library/Image/Thumbnail', { params: {id}, responseType: "blob" });
  }

  public postImage(image: File, fileName: string, description: string) {
    let formData = new FormData();
    formData.append('description', description);
    formData.append('data', new Blob([image], { type: image.type }), fileName);
    return this.http.post(environment.baseUrl + '/Library/Image/PostImage', formData);
  }

  public deleteImage(id: string) {
    return this.http.delete(environment.baseUrl + '/Library/Image/DeleteImage', {params: {id}})
  }

  constructor(private http: HttpClient, private urlService: UrlService) { }
}
