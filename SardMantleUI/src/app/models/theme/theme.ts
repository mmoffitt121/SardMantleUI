import { SafeUrl } from "@angular/platform-browser";
import { Selectable } from "../selectable/selectable";

export interface Theme extends Selectable {
    id: number;
    name: string;
    isDefault: boolean;
	primaryColor: string;
	primaryColorSelected: string;
	invertedTextColor: string;
	invertedTextColorDisabled: string;
	textColor: string;
	textColorDisabled: string;
	secondaryTextColor: string;
	tertiaryTextColor: string;
	primaryAccentColor: string;
	primaryAccentColorDisabled: string;
	secondaryAccentColor: string;
	secondaryAccentColorDisabled: string;
	secondaryAccentColorSelected: string;
	backgroundColor: string;
	secondaryBackgroundColor: string;
	fieldOverlayColor: string;
	fieldOverlayColorDark: string;
	destructiveActionColor: string;
	primaryFont: string;
	fontWeightBold: string;
	dataPointValueFontSize: string;
}