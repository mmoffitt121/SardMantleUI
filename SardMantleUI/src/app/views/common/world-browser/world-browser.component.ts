import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { World } from 'src/app/models/world/world';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-world-browser',
  templateUrl: './world-browser.component.html',
  styleUrls: ['./world-browser.component.scss']
})
export class WorldBrowserComponent {
  public userId: string;

  public navigateToWorld(world: World) {
    this.router.navigate([world.location]);
  }

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private themeService: ThemeService) { 
    this.userId = localStorage["userId"];
  }

  ngOnInit(): void {
  }
}
