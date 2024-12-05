import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss']
})
export class EditSettingsComponent implements OnInit {
  @Input() settings: any[] = [];
  @Input() data: any;
  @Input() category: any;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() valueChange = new EventEmitter();

  @Input() showSaveCancel = true;

  public select(category: any) {
    this.category = category;
  }

  public saveData() {
    this.settings.forEach(setting => {
      setting.children.forEach((child: any) => {
        child.items.forEach((item: any) => {
          this.data[item.key] = item.value;
        })
      })
    });

    this.save.emit(this.data);
  }

  public valueChanged() {
    this.settings.forEach(setting => {
      setting.children.forEach((child: any) => {
        child.items.forEach((item: any) => {
          this.data[item.key] = item.value;
        })
      })
    });

    this.valueChange.emit(this.data);
  }

  ngOnInit() {
    if (this.data) {
      this.settings.forEach(setting => {
        setting.children.forEach((child: any) => {
          child.items.forEach((item: any) => {
            item.value = this.data[item.key];
          })
        })
      });
    }
    this.select(this.settings[0]);
  }
}
