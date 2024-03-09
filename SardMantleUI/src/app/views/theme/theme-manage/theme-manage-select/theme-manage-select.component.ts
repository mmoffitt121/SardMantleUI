import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { THEME_SETTING } from 'src/app/models/settings/settings-constants';
import { ErrorService } from 'src/app/services/error.service';
import { SettingJsonService } from 'src/app/services/settings/setting-json.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-theme-manage-select',
  templateUrl: './theme-manage-select.component.html',
  styleUrls: ['./theme-manage-select.component.scss']
})
export class ThemeManageSelectComponent {
  @Input() themes: any[] = [];
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  public selectTheme(theme: any) {
    this.themeService.selectTheme(theme);
  }

  constructor (private themeService: ThemeService, private dialog: MatDialog, private errorService: ErrorService, private settingService: SettingJsonService) {}
}
