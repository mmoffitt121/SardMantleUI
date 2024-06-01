import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Directive({
  selector: '[requireRole]'
})
export class RequireRoleDirective implements OnInit, OnDestroy, OnChanges {
  @Input() set requiredRole(role: string) {
    this.role = role;
  }
  @Input() role: string;
  @Input() enabledDisplay: string | undefined;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private permissions: string[] = [];

  private checkAccess() {
    this.elementRef.nativeElement.style.display = "none";
    if (!this.role) {
      this.elementRef.nativeElement.style.display = this.enabledDisplay ?? "block";
      return;
    }

    let path = this.role.split('.');
    let read = path[path.length - 1] == "Read"

    let resourceIterator = "";
    for (let i = 0; i < path.length; i++) {
      resourceIterator += path[i];
      if (this.permissions.includes(resourceIterator) || (read && this.permissions.includes(`${resourceIterator}.Read`)))
      {
        this.elementRef.nativeElement.style.display = this.enabledDisplay ?? "block";
        return;
      }
      resourceIterator += ".";
    }
  }

  constructor(private loginService: LoginService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.loginService.permissions$.pipe(takeUntil(this.destroyed$)).subscribe(permissions => {
      this.permissions = permissions;
      this.checkAccess();
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnChanges(changes: any): void {
    if (changes.role) {
      this.checkAccess();
    }
  }
}
