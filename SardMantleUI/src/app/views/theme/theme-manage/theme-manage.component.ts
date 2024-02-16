import { Component, OnInit } from '@angular/core';
import { ANY_SETTING_SUFFIX, THEME_SETTING } from 'src/app/models/settings/settings-constants';
import { SettingJsonService } from 'src/app/services/settings/setting-json.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';

@Component({
  selector: 'app-theme-manage',
  templateUrl: './theme-manage.component.html',
  styleUrls: ['./theme-manage.component.scss']
})
export class ThemeManageComponent implements OnInit {
  public themes: any[];

  constructor (public skeletonService: SkeletonService, public settingService: SettingJsonService) {}

  ngOnInit(): void {
    this.settingService.get(THEME_SETTING + ANY_SETTING_SUFFIX).subscribe(theme => console.log(theme));
  }
}
