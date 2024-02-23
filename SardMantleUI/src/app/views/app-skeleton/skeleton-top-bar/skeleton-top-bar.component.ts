import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Theme } from 'src/app/models/theme/theme';
import { LoginService } from 'src/app/services/login/login.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
  selector: 'app-skeleton-top-bar',
  templateUrl: './skeleton-top-bar.component.html',
  styleUrls: ['./skeleton-top-bar.component.scss']
})
export class SkeletonTopBarComponent {
  public userLoggedIn: boolean = false;
  public username: string | undefined;
  public themes = [] as Theme[];
  public loadingThemes = false;
  public inWorld = false;
  @Output() openMenu = new EventEmitter();

  openNavigation() {
    this.openMenu.emit();
  }

  public canGetThemes() {
    return this.urlService.getWorld() !== "";
  }
  public selectTheme(theme: Theme) {
    this.themeService.selectTheme(theme)
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
  public navigateLibraryHome() {
    this.router.navigate(['home']);
  }
  public navigateUserSettings() {
    this.router.navigate(['user-settings']);
  }
  public navigateWorldManager() {
    this.router.navigate(['world-manager']);
  }
  public navigateAdministration() {
    this.router.navigate(['administration']);
  }
  public userIsAdmin() {
    return localStorage.getItem('roles')?.split(',').includes("Administrator");
  }
  public openThemeManager() {
    this.router.navigate([this.urlService.getWorld(), 'theme']);
  }

  constructor (
    public router: Router, 
    public loginService: LoginService, 
    private dialog: MatDialog, 
    private themeService: ThemeService, 
    private urlService: UrlService
  ) { }

  ngOnInit() {
    this.userLoggedIn = this.loginService.isLoggedIn();
    this.username = localStorage['username'];
    this.inWorld = this.urlService.getWorld() !== "";
  }
}
