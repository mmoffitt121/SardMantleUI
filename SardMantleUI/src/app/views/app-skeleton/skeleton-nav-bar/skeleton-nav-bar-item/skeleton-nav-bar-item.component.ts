import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuOption } from 'src/app/models/navigation/menu-option';

@Component({
  selector: 'app-skeleton-nav-bar-item',
  templateUrl: './skeleton-nav-bar-item.component.html',
  styleUrls: ['./skeleton-nav-bar-item.component.scss']
})
export class SkeletonNavBarItemComponent {
  @Input() option: MenuOption;
  @Output() navigate = new EventEmitter();
}
