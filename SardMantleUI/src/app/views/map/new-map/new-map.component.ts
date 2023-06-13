import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-map',
  templateUrl: './new-map.component.html',
  styleUrls: ['./new-map.component.css']
})
export class NewMapComponent {
  public home() {
    this.router.navigate(['home']);
  }

  constructor(private router: Router) { }
}
