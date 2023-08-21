import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Theme } from 'src/app/models/theme/theme';
import { ErrorService } from 'src/app/services/error.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-manage-themes',
  templateUrl: './manage-themes.component.html',
  styleUrls: ['./manage-themes.component.scss']
})
export class ManageThemesComponent {
  public themes: Theme[];
  public selectedTheme: Theme;
  public fonts = [
    {id: "Arial", name: "Arial"}, 
    {id: "Comic Sans MS", name: "Comic Sans MS"},
    {id: "Courier New", name: "Courier New"},
    {id: "Georgia", name: "Georgia"},
    {id: "IM Fell English", name: "IM Fell English"},
    {id: "Impact", name: "Impact"}, 
    {id: "Tahoma", name: "Tahoma"}, 
    {id: "Times New Roman", name: "Times New Roman"}, 
    {id: "Trebuchet MS", name: "Trebuchet MS"}, 
    {id: "Verdana", name: "Verdana"}, 
  ];
  public selectedFont = {id: "", name: ""};
  public isLoadingTheme = false;

  public name = new FormControl();
  public primaryColor = new FormControl();
  public primaryColorSelected = new FormControl();
  public invertedTextColor = new FormControl();
  public invertedTextColorDisabled = new FormControl();
  public textColor = new FormControl();
  public textColorDisabled = new FormControl();
  public secondaryTextColor = new FormControl();
  public tertiaryTextColor = new FormControl();
  public primaryAccentColor = new FormControl();
  public primaryAccentColorDisabled = new FormControl();
  public secondaryAccentColor = new FormControl();
  public secondaryAccentColorDisabled = new FormControl();
  public secondaryAccentColorSelected = new FormControl();
  public backgroundColor = new FormControl();
  public secondaryBackgroundColor = new FormControl();
  public fieldOverlayColor = new FormControl();
  public fieldOverlayColorDark = new FormControl();
  public destructiveActionColor = new FormControl();
  public fontWeightBold = new FormControl();
  public dataPointValueFontSize = new FormControl();
  public isDefault = new FormControl();

  public loadThemes() {
    this.themeService.getThemes({}).subscribe(themes => {
      this.themes = themes;
    });
  }

  public saveTheme() {
    this.themeService.putTheme(this.getTheme()).subscribe(result => {
      this.errorService.showSnackBar("Theme successfully saved.");
    },
    error => {
      this.errorService.handle(error);
    })
  }

  public previewTheme() {
    this.themeService.previewTheme(this.getTheme());
  }

  public themeChanged() {
    if (!this.isLoadingTheme) {
      this.previewTheme();
    }
  }

  public fontChanged(font: any) {
    this.selectedFont = font;
  }

  public getTheme() {
    this.selectedTheme.name = this.name.value;
    this.selectedTheme.primaryColor = this.primaryColor.value?.toHexString();
    this.selectedTheme.primaryColorSelected = this.primaryColorSelected.value?.toHexString();
    this.selectedTheme.invertedTextColor = this.invertedTextColor.value?.toHexString();
    this.selectedTheme.invertedTextColorDisabled = this.invertedTextColorDisabled.value?.toHexString();
    this.selectedTheme.textColor = this.textColor.value?.toHexString();
    this.selectedTheme.textColorDisabled = this.textColorDisabled.value?.toHexString();
    this.selectedTheme.secondaryTextColor = this.secondaryTextColor.value?.toHexString();
    this.selectedTheme.tertiaryTextColor = this.tertiaryTextColor.value?.toHexString();
    this.selectedTheme.primaryAccentColor = this.primaryAccentColor.value?.toHexString();
    this.selectedTheme.primaryAccentColorDisabled = this.primaryAccentColorDisabled.value?.toHexString();
    this.selectedTheme.secondaryAccentColor = this.secondaryAccentColor.value?.toHexString();
    this.selectedTheme.secondaryAccentColorDisabled = this.secondaryAccentColorDisabled.value?.toHexString();
    this.selectedTheme.secondaryAccentColorSelected = this.secondaryAccentColorSelected.value?.toHexString();
    this.selectedTheme.backgroundColor = this.backgroundColor.value?.toHexString();
    this.selectedTheme.secondaryBackgroundColor = this.secondaryBackgroundColor.value?.toHexString();
    this.selectedTheme.fieldOverlayColor = this.fieldOverlayColor.value?.toHexString();
    this.selectedTheme.fieldOverlayColorDark = this.fieldOverlayColorDark.value?.toHexString();
    this.selectedTheme.destructiveActionColor = this.destructiveActionColor.value?.toHexString();
    this.selectedTheme.primaryFont = this.selectedFont.name;
    this.selectedTheme.fontWeightBold = this.fontWeightBold.value;
    this.selectedTheme.dataPointValueFontSize = this.dataPointValueFontSize.value;
    this.selectedTheme.isDefault = this.isDefault.value;

    return this.selectedTheme;
  }

  public newTheme() {
    this.themeService.postTheme(this.themeService.baseTheme).subscribe(result => {
      this.themeService.getThemes({}).subscribe(themes => {
        this.themes = themes;
        let newTheme = this.themes.find(th => th.id == result);
        if (newTheme) {
          this.selectTheme(newTheme);
        }
      });
    })
  }

  public async selectTheme(theme: Theme) {
    this.isLoadingTheme = true;
    this.themes.forEach(th => th.selected = false);
    theme.selected = true;
    this.selectedTheme = theme;

    this.name.setValue(this.selectedTheme.name);
    this.primaryColor.setValue(this.selectedTheme.primaryColor);
    this.primaryColorSelected.setValue(this.selectedTheme.primaryColorSelected);
    this.invertedTextColor.setValue(this.selectedTheme.invertedTextColor);
    this.invertedTextColorDisabled.setValue(this.selectedTheme.invertedTextColorDisabled);
    this.textColor.setValue(this.selectedTheme.textColor);
    this.textColorDisabled.setValue(this.selectedTheme.textColorDisabled);
    this.secondaryTextColor.setValue(this.selectedTheme.secondaryTextColor);
    this.tertiaryTextColor.setValue(this.selectedTheme.tertiaryTextColor);
    this.primaryAccentColor.setValue(this.selectedTheme.primaryAccentColor);
    this.primaryAccentColorDisabled.setValue(this.selectedTheme.primaryAccentColorDisabled);
    this.secondaryAccentColor.setValue(this.selectedTheme.secondaryAccentColor);
    this.secondaryAccentColorDisabled.setValue(this.selectedTheme.secondaryAccentColorDisabled);
    this.secondaryAccentColorSelected.setValue(this.selectedTheme.secondaryAccentColorSelected);
    this.backgroundColor.setValue(this.selectedTheme.backgroundColor);
    this.secondaryBackgroundColor.setValue(this.selectedTheme.secondaryBackgroundColor);
    this.fieldOverlayColor.setValue(this.selectedTheme.fieldOverlayColor);
    this.fieldOverlayColorDark.setValue(this.selectedTheme.fieldOverlayColorDark);
    this.destructiveActionColor.setValue(this.selectedTheme.destructiveActionColor);
    this.selectedFont = {id: this.selectedTheme.primaryFont, name: this.selectedTheme.primaryFont};
    this.fontWeightBold.setValue(this.selectedTheme.fontWeightBold);
    this.dataPointValueFontSize.setValue(this.selectedTheme.dataPointValueFontSize);
    this.isDefault.setValue(this.selectedTheme.isDefault);

    // Wait for fields to process set input
    await new Promise(f => setTimeout(f, 10));
    this.isLoadingTheme = false;
    this.previewTheme();
  }

  constructor(private themeService: ThemeService, private errorService: ErrorService) {
    this.loadThemes();
  }
}
