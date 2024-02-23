import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-settings-sidebar',
  templateUrl: './edit-settings-sidebar.component.html',
  styleUrls: ['./edit-settings-sidebar.component.scss']
})
export class EditSettingsSidebarComponent {
  @Output() select = new EventEmitter();
  @Input() settings: any[] = [];

  public selectSetting(setting: any) {
    this.select.emit(setting);
    console.log(this.settings)
  }
}
