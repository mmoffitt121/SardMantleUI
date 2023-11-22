import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-nav',
  templateUrl: './card-nav.component.html',
  styleUrls: ['./card-nav.component.scss']
})
export class CardNavComponent {
  @Output() up = new EventEmitter();
  @Output() down = new EventEmitter();
  @Output() delete = new EventEmitter();
}
