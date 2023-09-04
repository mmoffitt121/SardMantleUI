import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ViewThemesComponent } from './view-themes/view-themes.component';
import { Theme } from 'src/app/models/theme/theme';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public userLoggedIn: boolean = false;
  public username: string | undefined;
  public themes = [] as Theme[];
  public loadingThemes = false;
  public inWorld = false;

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
  public openThemes() {
    if (this.canGetThemes()) {
      this.themeService.getThemes({}).subscribe(data => {
        this.themes = data;
      })
    }
  }
  public openThemeManager() {
    this.router.navigate([this.urlService.getWorld(), 'settings', 'theme']);
  }

  constructor (
    public router: Router, 
    private loginService: LoginService, 
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
