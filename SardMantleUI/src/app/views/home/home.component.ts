import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { World } from 'src/app/models/world/world';
import { ErrorService } from 'src/app/services/error.service';
import { UrlService } from 'src/app/services/url/url.service';
import { WorldService } from 'src/app/services/world/world.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public world: World | undefined;
  constructor(
    public router: Router, 
    public activatedRoute: ActivatedRoute, 
    public urlService: UrlService, 
    private worldService: WorldService, 
    private errorService: ErrorService) { }

  ngOnInit(): void {
    this.worldService.getWorlds({location: this.urlService.getWorld()}).subscribe(data => {
      if (data && data.length > 0) {
        this.world = data[0];
      }
      else {
        this.errorService.showSnackBar("World not found.");
        this.router.navigate(['home']);
      }
    }, error => {
      this.errorService.showSnackBar("World not found.");
      this.router.navigate(['home']);
    })
  }
}
