import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { World } from 'src/app/models/world/world';
import { environment } from 'src/environments/environment';
import { UrlService } from '../url/url.service';

export const RECENT_WORLDS_SETTING = 'recentWorlds';
export const MAX_RECENT_WORLDS = 5;

@Injectable({
  providedIn: 'root'
})
export class RecentWorldService {
    public getRecentWorlds(): World[] {
        let recentWorldsString = localStorage.getItem(RECENT_WORLDS_SETTING);
        let recentWorlds;
        if (recentWorldsString != undefined) {
            recentWorlds = JSON.parse(recentWorldsString)
        } else {
            recentWorlds = [];
        }

        return recentWorlds;
    }

    public handleWorldNavigate(world: World) {
        let recentWorlds = this.getRecentWorlds();

        if (recentWorlds.map(w => w.location).includes(world.location)) {
            recentWorlds.splice(recentWorlds.map(w => w.location).indexOf(world.location), 1);
        }
        recentWorlds.unshift(world);

        if (recentWorlds.length > MAX_RECENT_WORLDS) {
            recentWorlds.splice(MAX_RECENT_WORLDS, recentWorlds.length);
        }

        localStorage.setItem(RECENT_WORLDS_SETTING, JSON.stringify(recentWorlds));
    }
  
  constructor(private urlService: UrlService) { }
}
