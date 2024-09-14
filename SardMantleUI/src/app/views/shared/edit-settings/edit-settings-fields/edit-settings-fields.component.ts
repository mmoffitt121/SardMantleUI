import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-settings-fields',
  templateUrl: './edit-settings-fields.component.html',
  styleUrls: ['./edit-settings-fields.component.scss']
})
export class EditSettingsFieldsComponent {
  @Input() setting: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  @Input() showSaveCancel = true;
}
