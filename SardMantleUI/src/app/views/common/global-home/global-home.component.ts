import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-global-home',
  templateUrl: './global-home.component.html',
  styleUrls: ['./global-home.component.scss']
})
export class GlobalHomeComponent {
  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
