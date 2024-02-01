import { Component, OnDestroy, ViewChild, ChangeDetectorRef, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { UrlService } from 'src/app/services/url/url.service';

export const MAX_SIDEBAR_SCREEN_WIDTH = 650;

@Component({
  selector: 'app-app-skeleton',
  templateUrl: './app-skeleton.component.html',
  styleUrls: ['./app-skeleton.component.scss']
})
export class AppSkeletonComponent implements OnDestroy, OnInit {
  @ViewChild('sidenav', {static: false}) drawer: MatDrawer;

  private unsubscribe$ = new Subject();
  public useTopBar = true;
  public screenWidth: number;

  public updateState(routerEvent: any) {
    this.useTopBar = !(this.urlService.getWorld());
  }

  public toggleMenu() {
    this.skeletonService.toggleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  public isMobileSize() {
    return this.screenWidth < MAX_SIDEBAR_SCREEN_WIDTH;
  }

  constructor (public router: Router, public skeletonService: SkeletonService, private cdref: ChangeDetectorRef, private urlService: UrlService) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;

    this.router.events.pipe(
      filter((e: any): e is NavigationEnd => e instanceof NavigationEnd),
    ).subscribe(routerEvent => {
      this.updateState(routerEvent);
    })

    this.skeletonService.toggleSidebarSubject.pipe(takeUntil(this.unsubscribe$)).subscribe(toggle => {
      toggle ? this.drawer?.open() : this.drawer?.close() ;
    })

    this.skeletonService.lablesSubject.pipe(takeUntil(this.unsubscribe$)).subscribe(toggle => {
      this.drawer?.close().then(() => {
        this.skeletonService.completeToggleLabels();
        this.drawer?.open()
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next("unsub");
    this.unsubscribe$.complete();
  }
}
