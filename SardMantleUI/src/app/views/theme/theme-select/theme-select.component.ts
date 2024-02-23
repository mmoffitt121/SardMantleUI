import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ANY_SETTING_SUFFIX, THEME_SETTING } from 'src/app/models/settings/settings-constants';
import { Theme } from 'src/app/models/theme/theme';
import { LoginService } from 'src/app/services/login/login.service';
import { SettingJsonService } from 'src/app/services/settings/setting-json.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
  selector: 'app-theme-select',
  templateUrl: './theme-select.component.html',
  styleUrls: ['./theme-select.component.scss']
})
export class ThemeSelectComponent implements OnInit {
  public themes = [] as any[];
  public userLoggedIn = false;

  public selectTheme(theme: Theme) {
    this.themeService.selectTheme(theme)
  }
  public canGetThemes() {
    return this.urlService.getWorld() !== "";
  }
  public getThemes() {
    if (this.canGetThemes()) {
      this.settingService.get({id: THEME_SETTING + ANY_SETTING_SUFFIX}).subscribe(data => {
        this.themes = data;
        console.log(data);
      })
    }
  }
  public openThemeManager() {
    this.router.navigate([this.urlService.getWorld(), 'theme']);
    this.dialogRef.close();
  }

  constructor(private urlService: UrlService, private themeService: ThemeService, private settingService: SettingJsonService, private router: Router, public dialogRef: MatDialogRef<ThemeSelectComponent>, public loginService: LoginService) {}

  ngOnInit(): void {
    this.getThemes();
    this.userLoggedIn = this.loginService.isLoggedIn();
  }
}
