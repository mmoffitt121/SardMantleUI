import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';

@Component({
  selector: 'app-settings-topbar',
  templateUrl: './settings-topbar.component.html',
  styleUrls: ['./settings-topbar.component.scss']
})
export class SettingsTopbarComponent {
  @Input() pageName: string;
  @Input() showAdd: boolean;
  @Input() toggleGroupOptions: any[];
  @Input() addRole: string = "";
  @Output() add = new EventEmitter();

  public pageMode: string;

  public doAdd() {
    this.add.emit();
  }

  public setPageMode(option: any) {

  }

  constructor(public skeletonService: SkeletonService) {}
}
