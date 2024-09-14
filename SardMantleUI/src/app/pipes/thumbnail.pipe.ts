import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { SecurePipe } from './secure.pipe';
import { environment } from 'src/environments/environment';

@Pipe({
    name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {
    constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

    transform(id: string): Observable<SafeUrl> {
        return this.http
            .get(environment.baseUrl + '/Library/Image/Thumbnail?id=' + id, { responseType: 'blob' })
            .pipe(map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))));
    }
}