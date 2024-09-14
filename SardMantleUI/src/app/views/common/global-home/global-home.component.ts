import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { World } from 'src/app/models/world/world';
import { LoginService } from 'src/app/services/login/login.service';
import { ServerInfoService } from 'src/app/services/server-info.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-global-home',
  templateUrl: './global-home.component.html',
  styleUrls: ['./global-home.component.scss']
})
export class GlobalHomeComponent {
  public userId: string;
  public version: string;

  public navigateToWorld(world: World) {
    this.router.navigate([world.location]);
  }

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private themeService: ThemeService, private serverInfoService: ServerInfoService, public loginService: LoginService) { 
    this.userId = localStorage["userId"];
  }

  ngOnInit(): void {
  }
}
