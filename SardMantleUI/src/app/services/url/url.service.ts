import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
    public getWorld() {
        let worldLocation = this.router.url.replace("/", "").substring(0, this.router.url.indexOf("/", 1) - 1);
        return worldLocation;
    }

  constructor (private router: Router) {}
}

