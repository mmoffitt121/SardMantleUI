import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UrlService } from 'src/app/services/url/url.service';
import { MENU_GROUPINGS_EXPANDED, MenuGrouping, MenuOption, navMenuOptions } from 'src/app/models/navigation/menu-option';
import { filter } from 'rxjs';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { ThemeSelectComponent } from '../../theme/theme-select/theme-select.component';

export const DISPLAY_EXPANDED = "DisplayGroupingExpanded";

@Component({
  selector: 'app-skeleton-nav-bar',
  templateUrl: './skeleton-nav-bar.component.html',
  styleUrls: ['./skeleton-nav-bar.component.scss']
})
export class SkeletonNavBarComponent {
  public userLoggedIn: boolean = false;
  public username: string | undefined;
  public loadingThemes = false;
  public inWorld = false;
  public displayExpanded = false;

  public menuOptions: MenuGrouping[];

  @Input() display: string | undefined = undefined;

  public navigate(option: MenuOption) {
    if (option.isRoot) {
      this.router.navigate([option.route]);
    }
    else {
      this.router.navigate([this.urlService.getWorld(), option.route]);
    }
  }
  public navigateLogIn() {
    this.router.navigate(['login']);
  }
  public navigateRegister() {
    this.router.navigate(['register']);
  }
  public navigateHome() {
    this.router.navigate([this.urlService.getWorld(), 'home']);
  }
  public navigateMap() {
    this.router.navigate([this.urlService.getWorld(), 'map']);
  }
  public navigateDocuments() {
    this.router.navigate([this.urlService.getWorld(), 'document']);
  }
  public navigateTimeline() {
    this.router.navigate([this.urlService.getWorld(), 'timeline']);
  }
  public navigateUnits() {
    this.router.navigate([this.urlService.getWorld(), 'units']);
  }
  public navigateLibraryHome() {
    this.router.navigate(['home']);
  }
  public navigateUserSettings() {
    this.router.navigate(['user-settings']);
  }
  public navigateWorldManager() {
    this.router.navigate(['world-manager']);
  }
  public navigateWorldBrowser() {
    this.router.navigate(['world-browser']);
  }
  public navigateAdministration() {
    this.router.navigate(['administration']);
  }
  public userIsAdmin() {
    return localStorage.getItem('roles')?.split(',').includes("Administrator");
  }
  public selectTheme() {
    this.dialog.open(ThemeSelectComponent, {});
  }
  public toggleLabels() {
    this.skeletonService.toggleLabels();
  }

  public setGroupingExpanded(grouping: MenuGrouping, expanded: boolean) {
    grouping.expanded = expanded;

    let settingString = localStorage.getItem(MENU_GROUPINGS_EXPANDED);
    let settings = settingString ? JSON.parse(settingString) : {};
    settings[grouping.name] = expanded;
    localStorage.setItem(MENU_GROUPINGS_EXPANDED, JSON.stringify(settings));
  }

  public setDisplayExpanded() {
    this.displayExpanded = !this.displayExpanded;

    let settingString = localStorage.getItem(MENU_GROUPINGS_EXPANDED);
    let settings = settingString ? JSON.parse(settingString) : {};
    settings[DISPLAY_EXPANDED] = this.displayExpanded;
    localStorage.setItem(MENU_GROUPINGS_EXPANDED, JSON.stringify(settings));
  }

  private updateState() {
    this.inWorld = this.urlService.getWorld() !== "";
    let newMenuOptions = [] as MenuGrouping[];
    let expandSettings = JSON.parse(localStorage.getItem(MENU_GROUPINGS_EXPANDED) ?? "{}");
    navMenuOptions.forEach(grouping => {
      let newGrouping = {
        name: grouping.name,
        fillHook: grouping.fillHook,
        expanded: (expandSettings[grouping.name] !== undefined ? expandSettings[grouping.name] : grouping.expanded),
        options: []
      } as MenuGrouping;

      grouping.options.forEach(option => {
        if ((option.isRoot || this.inWorld) && this.loginService.userHasAnyOfRoles(option.roles)) {
          newGrouping.options.push(option);
        }
      });

      if (newGrouping.options.length > 0) {
        newMenuOptions.push(newGrouping);
      }
    });

    if (expandSettings[DISPLAY_EXPANDED] !== undefined) {
      this.displayExpanded = expandSettings[DISPLAY_EXPANDED];
    }

    this.menuOptions = newMenuOptions;
  }

  constructor (
    public router: Router, 
    private loginService: LoginService, 
    private urlService: UrlService,
    public skeletonService: SkeletonService,
    public cdref: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userLoggedIn = this.loginService.isLoggedIn();
    this.username = localStorage['username'];
    this.inWorld = this.urlService.getWorld() !== "";
    this.router.events.pipe(
      filter((e: any): e is NavigationEnd => e instanceof NavigationEnd),
    ).subscribe(routerEvent => {
      this.updateState();
    });
    this.updateState();
  }
}
