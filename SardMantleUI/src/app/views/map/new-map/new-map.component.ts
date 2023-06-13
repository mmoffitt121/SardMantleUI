import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-map',
  templateUrl: './new-map.component.html',
  styleUrls: ['./new-map.component.scss']
})
export class NewMapComponent {
  public home() {
    this.router.navigate(['home']);
  }

  public handleSave(data: any) {
    this.router.navigate(['map/' + data]);
  }

  constructor(private router: Router) { }
}
