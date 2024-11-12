import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/models/pages/page';
import { PageEditorService } from 'src/app/services/pages/page-editor.service';
import { FormItem } from 'src/app/views/shared/form/form.component';

@Component({
  selector: 'app-page-header-settings',
  templateUrl: './page-header-settings.component.html',
  styleUrls: ['./page-header-settings.component.scss']
})
export class PageHeaderSettingsComponent implements OnInit {
  @Input() page: Page;
  public headerSettingsObject: any;

  public items: FormItem[] | undefined;

  change(items: any[]) {
    if (items && items.length) {
      this.headerSettingsObject.style = items[0].value;
      this.headerSettingsObject.justifyHeader = items[1].value;
      this.page.headerSettings = JSON.stringify(this.headerSettingsObject);
      this.service.updateStyle();
    }
  }


  private setItems() {
    this.items = [];
    this.items.push({
      name: "Style",
      value: this.headerSettingsObject.style,
      required: true,
      options: [
        { name: "None", value: "None" },
        { name: "Background", value: "Background" },
        { name: "Rectangular", value: "Rectangular" },
        { name: "Rounded", value: "Rounded" },
      ]
    } as FormItem);

    this.items.push({
      name: "Justify Header",
      value: this.headerSettingsObject.justifyHeader,
      required: true,
      options: [
        { name: "Left", value: "Left" },
        { name: "Center", value: "Center" },
        { name: "Right", value: "Right" },
      ]
    } as FormItem);
  }

  constructor(private service: PageEditorService) {}

  ngOnInit(): void {
    this.headerSettingsObject = JSON.parse(this.page.headerSettings ? this.page.headerSettings : "{}");
    this.setItems();
  }
}
