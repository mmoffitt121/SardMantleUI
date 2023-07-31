import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { World } from 'src/app/models/world/world';

@Component({
  selector: 'app-global-home',
  templateUrl: './global-home.component.html',
  styleUrls: ['./global-home.component.scss']
})
export class GlobalHomeComponent {
  public userId: string;

  public navigateToWorld(world: World) {
    this.router.navigate([world.location]);
  }

  constructor(public router: Router, public activatedRoute: ActivatedRoute) { 
    this.userId = localStorage["userId"];
  }

  ngOnInit(): void {
  }
}
