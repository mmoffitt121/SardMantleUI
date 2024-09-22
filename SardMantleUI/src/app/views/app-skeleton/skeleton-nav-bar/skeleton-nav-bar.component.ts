import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UrlService } from 'src/app/services/url/url.service';
import { MENU_GROUPINGS_EXPANDED, MenuGrouping, MenuOption } from 'src/app/models/navigation/menu-option';
import { filter } from 'rxjs';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { ThemeSelectComponent } from '../../theme/theme-select/theme-select.component';
import { MenuItemService } from 'src/app/services/menu-items/menu-item.service';
import { WorldService } from 'src/app/services/world/world.service';
import { World } from 'src/app/models/world/world';
import { RecentWorldService } from 'src/app/services/world/recent-world.service';

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
  public displayExpanded = true;
  private cachedLocation = "";
  public world: any;
  public loadingWorld = true;

  public menuOptions: MenuGrouping[];
  public bottomBarMenuOptions: MenuOption[];

  @Input() display: string | undefined = undefined;

  public navigate(option: MenuOption) {
    if (option.options?.length) {
      this.setGroupingExpanded(option, !option.expanded);
    } 
    else {
      if (option.isRoot) {
        this.router.navigate([option.route]);
      }
      else {
        this.router.navigate([this.urlService.getWorld(), option.route]);
      }
    }
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
    if (!this.urlService.getWorld()) {
      this.world = undefined;
      this.loadingWorld = false;
    } else if (this.urlService.getWorld() != this.cachedLocation) {
      this.loadingWorld = true;
      this.worldService.getWorlds({location: this.urlService.getWorld()}).subscribe(worlds => {
        this.world = worlds[0];
        this.loadingWorld = false;
        this.recentWorldService.handleWorldNavigate(this.world);
      });
    }
    this.menuItemService.get().subscribe(data => {
      this.menuOptions = data;
      this.inWorld = this.urlService.getWorld() !== "";
      let newMenuOptions = [] as MenuGrouping[];
      let expandSettings = JSON.parse(localStorage.getItem(MENU_GROUPINGS_EXPANDED) ?? "{}");
      if (!this.urlService.getWorld()) {
        let recentWorlds = this.recentWorldService.getRecentWorlds();
        let recentWorldoptions = recentWorlds.map((w: World) => ({
          isRoot: true,
          route: w.location,
          name: w.name
        }));
        let recentWorldGrouping = {
          name: "Recent Worlds",
          options: recentWorldoptions
        }
        data?.unshift(recentWorldGrouping)
      }
      this.bottomBarMenuOptions = [];
      data?.forEach((grouping: any) => {
        let newGrouping = {
          name: grouping.name,
          fillHook: grouping.fillHook,
          expanded: (expandSettings[grouping.name] !== undefined ? expandSettings[grouping.name] : grouping.expanded),
          options: []
        } as MenuGrouping;

        grouping.options.forEach((option: any) => {
          option.expanded = (expandSettings[option.name] !== undefined ? expandSettings[option.name] : option.expanded);
          if ((option.isRoot || this.inWorld) && this.loginService.userHasAnyOfRoles(option.roles)) {
            newGrouping.options.push(option);
          }
        });

        if (newGrouping.options.length > 0) {
          if (newGrouping.name === "Global") {
            newGrouping.options.forEach(opt => this.bottomBarMenuOptions.push(opt));
          } else {
            newMenuOptions.push(newGrouping);
          }
          
        }
      });

      if (expandSettings[DISPLAY_EXPANDED] !== undefined) {
        this.displayExpanded = expandSettings[DISPLAY_EXPANDED] ?? true;
      }

      this.menuOptions = newMenuOptions;
    });
  }

  constructor (
    public router: Router, 
    private loginService: LoginService, 
    private urlService: UrlService,
    public skeletonService: SkeletonService,
    public cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private menuItemService: MenuItemService,
    private worldService: WorldService,
    private recentWorldService: RecentWorldService,
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
