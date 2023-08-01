import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'appBase',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  public primaryColor = "rgba(79, 59, 59, 1)";
  public primaryColorSelected = "rgba(90, 76, 75, 1)";
  public invertedTextColor = "rgb(44, 39, 39, 1)";
  public invertedTextColorDisabled = "rgb(121, 102, 102, 1)";
  public textColor =  "rgba(255, 255, 255, 1)";
  public textColorDisabled =  "rgba(255, 255, 255, 0.5)";
  public secondaryTextColor =  "rgba(200, 200, 200, 1)";
  public tertiaryTextColor =  "rgb(165, 165, 165)";
  public primaryAccentColor =  "rgb(255, 236, 235)";
  public primaryAccentColorDisabled =  "rgb(196, 179, 178)";
  public secondaryAccentColor =  "rgb(102, 83, 82)";
  public secondaryAccentColorDisabled =  "rgb(66, 52, 52)";
  public secondaryAccentColorSelected =  "rgb(155, 95, 89)";
  public backgroundColor =  "rgb(218, 197, 192)";
  public secondaryBackgroundColor =  "rgb(48, 34, 34)";
  public fieldOverlayColor =  "rgba(46, 28, 27, 0.25)";
  public fieldOverlayColorDark =  "rgba(14, 8, 7, 0.5)";
  public destructiveActionColor =  "rgb(119, 0, 0)";
  public primaryFont = 'IM Fell English';
  public fontWeightBold = "bold";
  public dataPointValueFontSize = "20px";

  public style = {
    '--primary-color': this.primaryColor,
    '--primary-color-selected': this.primaryColorSelected,
    '--inverted-text-color': this.invertedTextColor,
    '--inverted-text-color-disabled': this.invertedTextColorDisabled,
    '--text-color': this.textColor,
    '--text-color-disabled': this.textColorDisabled,
    '--secondary-text-color': this.secondaryTextColor,
    '--tertiary-text-color': this.tertiaryTextColor,
    '--primary-accent-color': this.primaryAccentColor,
    '--primary-accent-color-disabled': this.primaryAccentColorDisabled,
    '--secondary-accent-color': this.secondaryAccentColor,
    '--secondary-accent-color-disabled': this.secondaryAccentColorDisabled,
    '--secondary-accent-color-selected': this.secondaryAccentColorSelected,
    '--background-color': this.backgroundColor,
    '--secondary-background-color': this.secondaryBackgroundColor,
    '--field-overlay-color': this.fieldOverlayColor,
    '--field-overlay-color-dark': this.fieldOverlayColorDark,
    '--destructive-action-color': this.destructiveActionColor,
    '--primary-font': this.primaryFont,
    '--font-weight-bold': this.fontWeightBold,
    '--data-point-value-font-size': this.dataPointValueFontSize,
  };

  constructor(private themeService: ThemeService) {
    
  }
}
