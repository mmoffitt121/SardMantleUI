import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { extend } from 'leaflet';
import { takeUntil } from 'rxjs';
import { PageElement } from 'src/app/models/pages/page';
import { PageEditorService } from 'src/app/services/pages/page-editor.service';
import { DestroyableComponent } from 'src/app/views/shared/util/destroyable/destroyable.component';

@Component({
  selector: 'app-page-view-element',
  templateUrl: './page-view-element.component.html',
  styleUrls: ['./page-view-element.component.scss']
})
export class PageViewElementComponent extends DestroyableComponent implements OnChanges, OnInit {
  @Input() element: PageElement | undefined;
  public editing = false;
  public settings: any;
  public selected = false;

  @Input() displayMenuButton = false;
  @Input() passthroughSettings: any | undefined;

  public edit() {

  }

  public editSettings() {

  }

  public delete() {
    
  }

  public select() {
    this.selected = true;
    this.service.select(this.element);
  }

  constructor (private service: PageEditorService) { super(); }

  ngOnInit(): void {
    this.service.selected.pipe(takeUntil(this.destroyed$)).subscribe(selected => {
      if (selected && this.element && selected === this.element) {
        this.selected = true;
      } else {
        this.selected = false;
      }
    });

    this.service.editing.pipe(takeUntil(this.destroyed$)).subscribe(editing => this.editing = editing);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['element']) {
      this.settings = JSON.parse(this.element?.objectSettings ?? '{}')
    }
  }
}
