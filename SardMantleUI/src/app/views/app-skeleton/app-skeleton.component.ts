import { Component, OnDestroy, ViewChild, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';


@Component({
  selector: 'app-app-skeleton',
  templateUrl: './app-skeleton.component.html',
  styleUrls: ['./app-skeleton.component.scss']
})
export class AppSkeletonComponent implements OnDestroy, OnInit {
  @ViewChild('sidenav', {static: false}) drawer: MatDrawer;

  private unsubscribe$ = new Subject();
  public useTopBar = true;

  public updateState(routerEvent: any) {
    let currentLocation = routerEvent.url.split('/')[2];
    this.useTopBar = !(currentLocation === "map"
      || currentLocation === "document"
    );
  }

  public toggleMenu() {
    this.skeletonService.toggleSidebar();
  }

  constructor (public router: Router, public skeletonService: SkeletonService, private cdref: ChangeDetectorRef) { }

  ngOnInit() {
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
