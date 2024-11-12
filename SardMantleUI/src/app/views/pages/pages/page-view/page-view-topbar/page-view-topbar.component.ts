import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Page } from 'src/app/models/pages/page';
import { PageEditorService } from 'src/app/services/pages/page-editor.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { DestroyableComponent } from 'src/app/views/shared/util/destroyable/destroyable.component';

@Component({
  selector: 'app-page-view-topbar',
  templateUrl: './page-view-topbar.component.html',
  styleUrls: ['./page-view-topbar.component.scss']
})
export class PageViewTopbarComponent extends DestroyableComponent implements OnInit {
  @Input() page: Page;
  public topbarSettingsObject: any;
  public topbarClasses: string;
  public headerTextClasses: string;

  @Output() showTopbar = new EventEmitter();
  public showTitle = true;

  public updateStyle() {
    this.topbarSettingsObject = JSON.parse(this.page?.headerSettings ? this.page.headerSettings : "{}");

    var style = "top-actions-container";
    if (this.topbarSettingsObject.style == 'Background') {
      style = style + " top-actions-container-background"
    } else if (this.topbarSettingsObject.style == 'Rectangular') {
      style = style + " top-actions-container-rectangular"
    } else if (this.topbarSettingsObject.style == 'Rounded') {
      style = style + " top-actions-container-rounded"
    }

    const forceMenuButton = this.page.root.objectType != "View"

    if (this.topbarSettingsObject.style == 'None' && !forceMenuButton) {
      this.showTopbar.emit(false);
    } else {
      this.showTopbar.emit(true);
    }

    if (this.topbarSettingsObject.justifyHeader == "Center") {
      this.headerTextClasses = "justify-center";
      style = style + " container-justify-center";
    } else if (this.topbarSettingsObject.justifyHeader == "Right") {
      this.headerTextClasses = "justify-right";
      style = style + " container-justify-right";
    } else {
      this.headerTextClasses = "";
      style = style + " container-justify-left";
    }

    this.showTitle = !(this.topbarSettingsObject.style == 'None');

    this.topbarClasses = style;
  }

  constructor(public skeletonService: SkeletonService, private service: PageEditorService) { super(); }

  ngOnInit(): void {
    this.updateStyle();

    this.service.styleUpdate.pipe(takeUntil(this.destroyed$)).subscribe(update => this.updateStyle());
  }
}
