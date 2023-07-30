import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
  
@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    let worldLocation = this.router.url.replace("/", "").substring(0, this.router.url.indexOf("/", 1) - 1);
    const clonedRequest = req.clone({ headers: req.headers.append('WorldLocation', worldLocation) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }

  constructor (private router: Router) {}
}