import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
  selector: 'app-new-map',
  templateUrl: './new-map.component.html',
  styleUrls: ['./new-map.component.scss']
})
export class NewMapComponent {
  public home() {
    this.router.navigate([this.urlService.getWorld(), 'home']);
  }

  public handleSave(data: any) {
    this.router.navigate([this.urlService.getWorld(), 'map', data]);
  }

  constructor(private router: Router, public urlService: UrlService, private themeService: ThemeService) { }
}
