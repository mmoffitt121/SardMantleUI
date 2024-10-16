import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { takeUntil } from 'rxjs';
import { PageElement } from 'src/app/models/pages/page';
import { PageEditorService, PageObjectType } from 'src/app/services/pages/page-editor.service';
import { FormItem } from 'src/app/views/shared/form/form.component';
import { DestroyableComponent } from 'src/app/views/shared/util/destroyable/destroyable.component';

@Component({
  selector: 'app-page-element-settings',
  templateUrl: './page-element-settings.component.html',
  styleUrls: ['./page-element-settings.component.scss']
})
export class PageElementSettingsComponent extends DestroyableComponent {
  @Input() pageElement: PageElement;

  public items: FormItem[] | undefined;

  private pageOptions: PageObjectType[];

  private settings: any;

  private currentLayout: string;

  change(items: any[]) {
    if (items.length) {
      this.pageElement.objectType = items[0].value
      this.settings = {}
      let objType = this.pageOptions.find(po => po.name == items[0].value)
      for (let i = 1; i < items.length; i++) {
        let key = objType?.settings[i-1].key ?? "";
        this.settings[key] = items[i].value;
      }

      if (items[0].value != this.currentLayout) {
        this.currentLayout = items[0].value;
        this.setItems();
      }

      this.cdref.detectChanges();
    }
  }

  private setItems() {
    this.items = [];
      this.settings = this.pageElement.objectSettings ? JSON.parse(this.pageElement.objectSettings) : {};

      const layoutOptions = this.pageOptions.map(o => ({name: o.name, value: o.name}));
      const value = this.pageElement.objectType?.toString() ?? "";
      this.items.push({
        name: "Layout",
        value: value,
        required: true,
        options: layoutOptions,
      } as FormItem);

      let options = this.pageOptions?.find(po => po.name == this.pageElement.objectType)?.settings
      options?.forEach(option => {
        this.items?.push({
          name: option.key,
          value: option.value,
          required: true,
          options: option.possibleValues?.map(val => ({
            name: val,
            value: val,
          })) ?? []
        } as FormItem)
      });
  }

  ngOnInit(): void {
    this.pageEditorService.pageObjectTypes.pipe(takeUntil(this.destroyed$)).subscribe(pageOptions => {
      this.pageOptions = pageOptions;
      this.setItems();
    });
  }

  constructor(private pageEditorService: PageEditorService, private cdref: ChangeDetectorRef) {
    super();
  }
}
