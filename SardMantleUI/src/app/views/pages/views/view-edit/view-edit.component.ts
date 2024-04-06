import { Component, EventEmitter, Input, Output } from '@angular/core';
import { View } from 'src/app/models/pages/view';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.scss']
})
export class ViewEditComponent {
  @Input() view: View;
  @Output() viewChange = new EventEmitter();

  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();
  public changes = false;


  public editDetails() {

  }

  public onSave() {
    this.save.emit(this.view);
  }

  public onClose() {
    this.close.emit();
  }
}
