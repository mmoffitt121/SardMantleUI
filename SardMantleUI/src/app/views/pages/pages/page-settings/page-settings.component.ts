import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Page } from 'src/app/models/pages/page';
import { PageEditorService, PageObjectType } from 'src/app/services/pages/page-editor.service';
import { FormItem, FormItemOption } from 'src/app/views/shared/form/form.component';
import { DestroyableComponent } from 'src/app/views/shared/util/destroyable/destroyable.component';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent extends DestroyableComponent implements OnInit {
  @Input() page: Page;

  public items: FormItem[] | undefined;

  private pageOptions: PageObjectType[];

  private settings: any;

  change(items: any[]) {
    if (items && items.length) {
      this.page.name = items[0].value;
      this.page.description = items[1].value;
      this.page.path = items[2].value;
    }
  }

  changeElement() {

  }

  public setDefault() {
    this.pageEditorService.setDefault(this.page.id);
  }

  private setItems() {
    this.items = [];
      this.items.push({
        name: "Page Name",
        value: this.page.name,
        required: true,
      } as FormItem)
      this.items.push({
        name: "Description",
        value: this.page.description,
        required: true,
      } as FormItem)
      this.items.push({
        name: "Path",
        value: this.page.path,
        required: true,
      } as FormItem)

      this.items.push({
        required: false,
        type: "divider"
      } as FormItem)
  }

  ngOnInit(): void {
    if (!this.page.root) {
      this.page.root = {
        objectType: "Root",
        objectSettings: "{}",
        children: []
      }
    }

    this.pageEditorService.pageObjectTypes.pipe(takeUntil(this.destroyed$)).subscribe(pageOptions => {
      this.pageOptions = pageOptions;
      this.setItems();
    });
  }

  constructor(private pageEditorService: PageEditorService, private cdref: ChangeDetectorRef) {
    super();
  }
}
