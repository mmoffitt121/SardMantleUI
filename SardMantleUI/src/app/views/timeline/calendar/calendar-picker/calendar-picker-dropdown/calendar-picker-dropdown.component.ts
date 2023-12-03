import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-calendar-picker-dropdown',
  templateUrl: './calendar-picker-dropdown.component.html',
  styleUrls: ['./calendar-picker-dropdown.component.scss']
})
export class CalendarPickerDropdownComponent {
  @Input() public reference: HTMLElement;
  @ViewChild(CdkPortal) public contentTemplate: CdkPortal;

  protected overlayRef: OverlayRef;
 
  public showing = false;
  
  public show() {
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
      this.overlayRef.attach(this.contentTemplate);
      this.syncWidth();
      this.overlayRef.backdropClick().subscribe(() => this.hide());
      this.showing = true;
  }
  
  public hide() {
    this.overlayRef.detach();
    this.showing = false;
  }
  
  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }
  
  private syncWidth() {
    if (!this.overlayRef) {
      return;
    }
  
    const refRect = this.reference.getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }

  protected getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }, {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      }]);
 
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }

  constructor (private overlay: Overlay) {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
  }
}
