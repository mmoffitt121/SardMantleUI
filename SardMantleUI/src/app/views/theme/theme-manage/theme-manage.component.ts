import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ANY_SETTING_SUFFIX, THEME_SETTING } from 'src/app/models/settings/settings-constants';
import { defaultTheme, themeMenuItems } from 'src/app/models/theme/theme-items';
import { SettingJsonService } from 'src/app/services/settings/setting-json.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { ThemeSelectComponent } from '../theme-select/theme-select.component';
import { ErrorService } from 'src/app/services/error.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-theme-manage',
  templateUrl: './theme-manage.component.html',
  styleUrls: ['./theme-manage.component.scss']
})
export class ThemeManageComponent implements OnInit {
  public themes: any[];
  public themeOptions = themeMenuItems;
  public themeData: any = undefined;

  public selectTheme() {
    this.dialog.open(ThemeSelectComponent, {
      data: { 
        editing: true
      }
    });
  }

  public add() {
    this.themeData = { ...defaultTheme };
  }

  public select(theme: any) {
    this.themeData = theme;
    this.themeData = defaultTheme;
  }

  public save(theme: any) {
    if (!theme.key) {
      theme.key = this.getUniqueKey();
    }
    let setting = {
      id: THEME_SETTING + "." + theme.key,
      setting: theme
    }
    this.settingService.put(setting).subscribe(result => {
      this.errorService.showSnackBar("Theme saved.");
      this.themeData = undefined;
      this.loadThemes();
    },
    error => {
      this.errorService.handle(error);
    })
  }

  private getUniqueKey() {
    let newKey = Math.floor(Math.random() * 1000000000000); 
    while (this.themes.filter(t => t.key === newKey).length > 0) {
      newKey = Math.floor(Math.random() * 1000000000000); 
    }
    return newKey;
  }

  public cancel() {
    this.themeData = undefined;
  }

  public loadThemes() {
    this.settingService.get({ id: THEME_SETTING + ANY_SETTING_SUFFIX }).subscribe(settings => {
      let themes: any = [];
      settings.forEach(setting => {
        themes.push(setting.setting);
      })
      this.themes = themes;
    });
  }

  public deleteTheme(theme: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: `Are you sure you want to delete theme ${theme.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingService.delete(THEME_SETTING + "." + theme.key.toString()).subscribe(result => {
          this.errorService.showSnackBar("Theme successfully deleted.");
          this.loadThemes();
        }, error => this.errorService.handle(error));
      }
    });
  }

  constructor (public skeletonService: SkeletonService, public settingService: SettingJsonService, public dialog: MatDialog, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.loadThemes();
  }
}
