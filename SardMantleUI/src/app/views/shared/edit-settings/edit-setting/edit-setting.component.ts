import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EditDataPointComponent } from '../../document-components/edit/edit-data-point/edit-data-point.component';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss']
})
export class EditSettingComponent implements AfterViewInit {
  @Input() setting: any;
  @ViewChild("fieldComponent") fieldComponent: any;
  @Output() valueChange = new EventEmitter();

  constructor(private cdref: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
  }
}
