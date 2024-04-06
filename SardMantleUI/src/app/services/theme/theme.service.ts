import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject, OnInit } from '@angular/core';
import { Theme } from 'src/app/models/theme/theme';
import { UrlService } from '../url/url.service';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SettingJsonService } from '../settings/setting-json.service';
import { THEME_SETTING } from 'src/app/models/settings/settings-constants';
import { defaultTheme } from 'src/app/models/theme/theme-items';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public theme: any;
  
  public selectTheme(theme: any) {
    localStorage.setItem(this.urlService.getWorld() + "-SelectedTheme", theme.key.toString());
    this.loadSelectedTheme();
  }

  public getSelectedThemeId() {
    return localStorage.getItem(this.urlService.getWorld() + "-SelectedTheme");
  }

  public loadSelectedTheme() {
    let currentThemeId = this.getSelectedThemeId();
    this.settingService.get({ id: THEME_SETTING + "." + currentThemeId }).subscribe(data => {
      if (data === undefined || data.length < 1) { return; }
      this.theme = data[0].setting;
      this.applyTheme();
    })
  }

  public previewTheme(theme: any) {
    this.theme = theme;
    this.applyTheme();
  }

  public applyTheme() {
    Object.keys(defaultTheme).forEach(key => {
      this.document.documentElement.style.removeProperty(key);
    })
    Object.keys(this.theme).forEach(key => {
      switch (key) {
        case "key":
        case "name":
          break;
        case "--lib-background-gradient-type":
        case "--lib-sidebar-gradient-type":
          this.setGradient(key);
          break;
        default:
          this.document.documentElement.style.setProperty(key, this.theme[key]);
          break;
      }
    })
  }

  private setGradient(key: string) {
    let newKey;
    let type;
    let direction;
    let color;
    let gradColor;
    switch (key) {
      case "--lib-background-gradient-type":
        newKey = "--lib-background-gradient";
        color = "--lib-background-color"
        break;
      case "--lib-sidebar-gradient-type":
        newKey = "--lib-sidebar-gradient";
        color = "--lib-sidebar-color"
        break;
      default:
        return;
    }
    type = newKey + "-type"
    direction = newKey + "-direction"
    gradColor = newKey + "-color"

    if (!this.theme[key]) {
      this.document.documentElement.style.setProperty(newKey, "none")
      return;
    }
    let gradStyle = `${this.theme[type]}(${this.theme[direction]}, ${this.theme[color]}, ${this.theme[gradColor]}) `
    this.document.documentElement.style.setProperty(newKey, gradStyle)
  }
  
  constructor(
    private http: HttpClient, 
    private urlService: UrlService, 
    @Inject(DOCUMENT) private document: Document, 
    private router: Router,
    private settingService: SettingJsonService
  ) { 
    this.theme = { };
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.urlService.getWorld() === "") {
          this.theme = { ...defaultTheme };
          this.applyTheme();
        }
        else {
          this.loadSelectedTheme();
        }
      }
    })
  }
}
