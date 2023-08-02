import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
    public getWorld() {
        let worldLocation = this.router.url.replace("/", "").substring(0, this.router.url.indexOf("/", 1) - 1);

        switch (worldLocation) {
          case "libraries_of":
                case "sys":
                case "sakila":
                case "world":
                case "login":
                case "register":
                case "user-settings":
                case "world-manager":
                case "home":
                case "worlds":
                case "administration":
                case "community":
                case "forum":
                case "admin":
                case "showcase":
                case "map":
                case "new-map":
                case "map-tiles":
                case "timeline":
                case "document":
                    return "";
                    break;
                default:
                    break;
        }
        return worldLocation;
    }

  constructor (private router: Router) {}
}

