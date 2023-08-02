import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject, OnInit } from '@angular/core';
import { Theme } from 'src/app/models/theme/theme';
import { UrlService } from '../url/url.service';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public baseTheme = {
    id: -1,
    name: "no-theme",
    primaryColor: "rgba(79, 59, 59, 1)",
    primaryColorSelected: "rgba(90, 76, 75, 1)",
    invertedTextColor: "rgb(44, 39, 39, 1)",
    invertedTextColorDisabled: "rgb(121, 102, 102, 1)",
    textColor:  "rgba(255, 255, 255, 1)",
    textColorDisabled:  "rgba(255, 255, 255, 0.5)",
    secondaryTextColor:  "rgba(200, 200, 200, 1)",
    tertiaryTextColor:  "rgb(165, 165, 165)",
    primaryAccentColor:  "rgb(255, 236, 235)",
    primaryAccentColorDisabled:  "rgb(196, 179, 178)",
    secondaryAccentColor:  "rgb(102, 83, 82)",
    secondaryAccentColorDisabled:  "rgb(66, 52, 52)",
    secondaryAccentColorSelected:  "rgb(155, 95, 89)",
    backgroundColor:  "rgb(218, 197, 192)",
    secondaryBackgroundColor:  "rgb(48, 34, 34)",
    fieldOverlayColor:  "rgba(46, 28, 27, 0.25)",
    fieldOverlayColorDark:  "rgba(14, 8, 7, 0.5)",
    destructiveActionColor:  "rgb(119, 0, 0)",
    primaryFont: 'IM Fell English',
    fontWeightBold: "bold",
    dataPointValueFontSize: "20px",
    isDefault: true,
    selected: true
  } as Theme;

  public theme: Theme;

  public getThemes(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Theme/GetThemes', { params: criteria });
  }

  public getThemeCount(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Theme/GetThemeCount', { params: criteria });
  }

  public postTheme(Theme: Theme) {
    return this.http.post('https://localhost:7094/Library/Theme/PostTheme', Theme);
  }

  public putTheme(Theme: Theme) {
    return this.http.put('https://localhost:7094/Library/Theme/PutTheme', Theme);
  }

  public deleteTheme(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Theme/DeleteTheme', { params: params });
  }

  public selectTheme(theme: Theme) {
    localStorage.setItem(this.urlService.getWorld() + "-SelectedTheme", theme.id.toString());
  }

  public getSelectedThemeId() {
    return localStorage.getItem(this.urlService.getWorld() + "-SelectedTheme");
  }

  public loadSelectedTheme() {
    let currentThemeId = this.getSelectedThemeId();
    if (currentThemeId === null) {
      this.getThemes({isDefault: true}).subscribe(data => {
        if (data === undefined || data.length < 1) { return; }
        this.theme = data[0]
        console.log(data)
        this.applyTheme();
      })
    }
    else {
      this.getThemes({id: currentThemeId}).subscribe(data => {
        if (data === undefined || data.length < 1) { return; }
        this.theme = data[0]
        this.applyTheme();
      })
    }
  }

  public applyTheme() {
    this.document.documentElement.style.setProperty('--primary-color', this.theme.primaryColor ?? this.baseTheme.primaryColor);
    this.document.documentElement.style.setProperty('--primary-color-selected', this.theme.primaryColorSelected ?? this.baseTheme.primaryColorSelected);
    this.document.documentElement.style.setProperty('--inverted-text-color', this.theme.invertedTextColor ?? this.baseTheme.invertedTextColor);
    this.document.documentElement.style.setProperty('--inverted-text-color-disabled', this.theme.invertedTextColorDisabled ?? this.baseTheme.invertedTextColorDisabled);
    this.document.documentElement.style.setProperty('--text-color', this.theme.textColor ?? this.baseTheme.textColor);
    this.document.documentElement.style.setProperty('--text-color-disabled', this.theme.textColorDisabled ?? this.baseTheme.textColorDisabled);
    this.document.documentElement.style.setProperty('--secondary-text-color', this.theme.secondaryTextColor ?? this.baseTheme.secondaryTextColor);
    this.document.documentElement.style.setProperty('--tertiary-text-color', this.theme.tertiaryTextColor ?? this.baseTheme.tertiaryTextColor);
    this.document.documentElement.style.setProperty('--primary-accent-color', this.theme.primaryAccentColor ?? this.baseTheme.primaryAccentColor);
    this.document.documentElement.style.setProperty('--primary-accent-color-disabled', this.theme.primaryAccentColorDisabled ?? this.baseTheme.primaryAccentColorDisabled);
    this.document.documentElement.style.setProperty('--secondary-accent-color', this.theme.secondaryAccentColor ?? this.baseTheme.secondaryAccentColor);
    this.document.documentElement.style.setProperty('--secondary-accent-color-disabled', this.theme.secondaryAccentColorDisabled ?? this.baseTheme.secondaryAccentColorDisabled);
    this.document.documentElement.style.setProperty('--secondary-accent-color-selected', this.theme.secondaryAccentColorSelected ?? this.baseTheme.secondaryAccentColorSelected);
    this.document.documentElement.style.setProperty('--background-color', this.theme.backgroundColor ?? this.baseTheme.backgroundColor);
    this.document.documentElement.style.setProperty('--secondary-background-color', this.theme.secondaryBackgroundColor ?? this.baseTheme.secondaryBackgroundColor);
    this.document.documentElement.style.setProperty('--field-overlay-color', this.theme.fieldOverlayColor ?? this.baseTheme.fieldOverlayColor);
    this.document.documentElement.style.setProperty('--field-overlay-color-dark', this.theme.fieldOverlayColorDark ?? this.baseTheme.fieldOverlayColorDark);
    this.document.documentElement.style.setProperty('--destructive-action-color', this.theme.destructiveActionColor ?? this.baseTheme.destructiveActionColor);
    this.document.documentElement.style.setProperty('--primary-font', this.theme.primaryFont ?? this.baseTheme.primaryFont);
    this.document.documentElement.style.setProperty('--font-weight-bold', this.theme.fontWeightBold ?? this.baseTheme.fontWeightBold);
    this.document.documentElement.style.setProperty('--data-point-value-font-size', this.theme.dataPointValueFontSize ?? this.baseTheme.dataPointValueFontSize);
  }
  
  constructor(private http: HttpClient, private urlService: UrlService, @Inject(DOCUMENT) private document: Document, private router: Router) { 
    this.theme = { ...this.baseTheme };
    this.loadSelectedTheme();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log("them")
        if (this.urlService.getWorld() === "") {
          this.theme = {} as Theme;
          this.applyTheme();
        }
        else {
          this.loadSelectedTheme();
        }
      }
    })
  }
}
