import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
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
  public pageElement: PageElement;
  @Output() change = new EventEmitter();

  public items: FormItem[] | undefined;

  private pageOptions: PageObjectType[];

  private settings: any;

  private currentLayout: string;

  onChange(items: any[]) {
    if (items.length) {
      this.pageElement.objectType = items[0].value
      this.settings = {}
      let objType = this.pageOptions.find(po => po.name == items[0].value)

      if (items[0].value != this.currentLayout) {
        this.currentLayout = items[0].value;
        this.setItems();
      } else {
        for (let i = 1; i < items.length; i++) {
          let key = objType?.settings[i-1].key ?? "";
          this.settings[key] = items[i].value;
        }
      }

      this.pageElement.objectSettings = JSON.stringify(this.settings);

      this.cdref.detectChanges();
      this.change.emit();
    }
  }

  private setItems() {
    this.items = [];

    if (!this.pageElement) {
      return;
    }

    this.settings = this.pageElement.objectSettings ? JSON.parse(this.pageElement.objectSettings) : {};

    const layoutOptions = this.pageOptions.map(o => ({name: o.name, value: o.name}));
    const value = this.pageElement.objectType?.toString() ?? "";
    this.items.push({
      name: "Layout",
      value: value,
      options: layoutOptions,
    } as FormItem);

    let options = this.pageOptions?.find(po => po.name == this.pageElement.objectType)?.settings
    options?.forEach(option => {
      this.items?.push({
        name: option.key,
        value: this.settings[option.key] ?? option.value,
        intValue: Number(this.settings[option.key] ?? option.value),
        type: (option.type == 101 ? 'dat' : undefined),
        options: option.possibleValues?.map(val => ({
          name: val.name,
          value: val.id,
        })) ?? []
      } as FormItem)
    });
  }

  public add() {
    this.pageElement.children.push({
      objectType: "View",
      objectSettings: "{\"Element Name\":\"View\",\"View\":\"\"}",
      children: [],
    })
  }

  public delete(element: PageElement) {
    this.pageElement.children.splice(this.pageElement.children.indexOf(element), 1);
  }

  drop(event: any) {
    moveItemInArray(this.pageElement.children, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.pageEditorService.pageObjectTypes.pipe(takeUntil(this.destroyed$)).subscribe(pageOptions => {
      this.pageOptions = pageOptions;
      this.setItems();
    });

    this.pageEditorService.selected.pipe(takeUntil(this.destroyed$)).subscribe(selected => {
      if (selected) {
        this.pageElement = selected;
        this.setItems();
      }
    })
  }

  constructor(private pageEditorService: PageEditorService, private cdref: ChangeDetectorRef) {
    super();
  }
}
