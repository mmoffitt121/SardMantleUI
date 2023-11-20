import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkeletonService {
  public toggleSidebarSubject = new BehaviorSubject(false);
  public labels = true;
  public lablesSubject = new BehaviorSubject(this.labels);

  public toggleSidebar() {
    this.setSidebarValue(!this.toggleSidebarSubject.value)
  }

  public setSidebarValue(value: boolean) {
    this.toggleSidebarSubject.next(value);
    localStorage.setItem("sideBarOpen", value.toString());
  }

  public toggleLabels() {
    this.lablesSubject.next(!this.labels);
  }

  public completeToggleLabels() {
    this.labels = !this.labels;
    localStorage.setItem("sideNavIncludeLabels", this.labels.toString());
  }

  constructor() { 
    let labels = localStorage.getItem("sideNavIncludeLabels");
    if (labels != undefined) {
      let lablesResult = labels === "true";
      this.labels = lablesResult;
      this.lablesSubject.next(this.labels);
    }

    let sideBarOpen = localStorage.getItem("sideBarOpen");
    if (sideBarOpen != undefined) {
      let result = sideBarOpen === "true";
      this.toggleSidebarSubject.next(result);
    }
  }
}
