import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { MapComponent } from './views/map/map.component';
import { SharedService } from './shared.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as mt from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { OverlayModule } from '@angular/cdk/overlay';
import { Portal, PortalModule } from '@angular/cdk/portal';

import { NgxEditorModule } from 'ngx-editor';

import { ViewLocationComponent } from './views/map/view-location/view-location.component';
import { ViewHeiarchyComponent } from './views/map/view-location/view-heiarchy/view-heiarchy.component';
import { EditLocationComponent } from './views/map/edit-location/edit-location.component';
import { ConfirmDialogComponent } from './views/shared/confirm-dialog/confirm-dialog.component';
import { ErrorToastComponent } from './views/shared/error-toast/error-toast.component';
import { DocumentComponent } from './views/document/document.component';
import { DocumentTypeComponent } from './views/document/document-type/document-type.component';
import { DocumentListComponent } from './views/document/document-list/document-list.component';
import { DocumentInfoComponent } from './views/document/document-info/document-info.component';
import { DocumentEditComponent } from './views/document/document-edit/document-edit.component';
import { EditBoolComponent } from './views/shared/document-components/edit/edit-bool/edit-bool.component';
import { EditIntComponent } from './views/shared/document-components/edit/edit-int/edit-int.component';
import { EditDoubleComponent } from './views/shared/document-components/edit/edit-double/edit-double.component';
import { EditStringComponent } from './views/shared/document-components/edit/edit-string/edit-string.component';
import { EditSummaryComponent } from './views/shared/document-components/edit/edit-summary/edit-summary.component';
import { EditArticleComponent } from './views/shared/document-components/edit/edit-article/edit-article.component';
import { EditDataPointComponent } from './views/shared/document-components/edit/edit-data-point/edit-data-point.component';
import { ViewArticleComponent } from './views/shared/document-components/view/view-article/view-article.component';
import { ViewBoolComponent } from './views/shared/document-components/view/view-bool/view-bool.component';
import { ViewDataPointComponent } from './views/shared/document-components/view/view-data-point/view-data-point.component';
import { ViewDoubleComponent } from './views/shared/document-components/view/view-double/view-double.component';
import { ViewIntComponent } from './views/shared/document-components/view/view-int/view-int.component';
import { ViewStringComponent } from './views/shared/document-components/view/view-string/view-string.component';
import { ViewSummaryComponent } from './views/shared/document-components/view/view-summary/view-summary.component';
import { EditDocumentTypeComponent } from './views/document/document-type/edit-document-type/edit-document-type.component';
import { EditTypeParameterComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter.component';
import { EditDocumentTypePropertiesComponent } from './views/document/document-type/edit-document-type/edit-document-type-properties/edit-document-type-properties.component';
import { EditTypeParameterIntComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter-int/edit-type-parameter-int.component';
import { EditTypeParameterDoubleComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter-double/edit-type-parameter-double.component';
import { EditTypeParameterStringComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter-string/edit-type-parameter-string.component';
import { EditTypeParameterSummaryComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter-summary/edit-type-parameter-summary.component';
import { EditTypeParameterDocumentComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter-document/edit-type-parameter-document.component';
import { EditTypeParameterImageComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter-image/edit-type-parameter-image.component';
import { EditTypeParameterDataPointComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter-data-point/edit-type-parameter-data-point.component';
import { EditTypeParameterBoolComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter-bool/edit-type-parameter-bool.component';
import { AddDocumentTypeComponent } from './views/document/document-type/add-document-type/add-document-type.component';
import { MapSelectComponent } from './views/map/map-select/map-select.component';
import { MapEditComponent } from './views/map/map-edit/map-edit.component';
import { NewMapComponent } from './views/map/new-map/new-map.component';
import { MapLayersComponent } from './views/map/map-layers/map-layers.component';
import { MapEditWindowComponent } from './views/map/map-edit/map-edit-window/map-edit-window.component';
import { ValueShortenPipe } from './pipes/value-shorten.pipe';
import { SearchBarComponent } from './views/shared/document-components/search/search-bar/search-bar.component';
import { MapAddWindowComponent } from './views/map/map-edit/map-add-window/map-add-window.component';
import { UploadFileComponent } from './views/shared/document-components/file/upload-file/upload-file.component';
import { EditMapLayerComponent } from './views/map/map-layers/edit-map-layer/edit-map-layer.component';
import { MapTilesComponent } from './views/map-tiles/map-tiles.component';
import { UploadMapTilesComponent } from './views/map-tiles/upload-map-tiles/upload-map-tiles.component';
import { LocationTypeComponent } from './views/map/location-type/location-type.component';
import { EditLocationTypeComponent } from './views/map/location-type/edit-location-type/edit-location-type.component';
import { FilterLocationComponent } from './views/map/filter-location/filter-location.component';
import { LoginComponent } from './views/auth/login/login.component';
import { NewAccountComponent } from './views/auth/new-account/new-account.component';
import { UserSettingsComponent } from './views/auth/user-settings/user-settings.component';
import { GlobalHomeComponent } from './views/common/global-home/global-home.component';
import { WorldBrowserComponent } from './views/common/world-browser/world-browser.component';
import { AdministrationComponent } from './views/administration/administration.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AddHeaderInterceptor } from './http-interceptors/add-header-interceptor';
import { WorldListComponent } from './views/common/global-home/world-list/world-list.component';
import { WorldManagerComponent } from './views/common/world-manager/world-manager.component';
import { WorldCreatorComponent } from './views/common/world-manager/world-creator/world-creator.component';
import { EditColorComponent } from './views/shared/document-components/edit/edit-color/edit-color.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { RouterModule } from '@angular/router';
import { UserAdministrationComponent } from './views/administration/user-administration/user-administration.component';
import { DatabaseAdministrationComponent } from './views/administration/database-administration/database-administration.component';
import { DeploymentAdministrationComponent } from './views/administration/deployment-administration/deployment-administration.component';
import { EditDocumentLocationsComponent } from './views/map/edit-location/edit-document-locations/edit-document-locations.component';
import { ViewLocationParamComponent } from './views/shared/document-components/view/view-location-param/view-location-param.component';
import { DocumentFilterComponent } from './views/document/document-filter/document-filter.component';
import { UnitsComponent } from './views/units/units.component';
import { ChangePasswordComponent } from './views/auth/user-settings/change-password/change-password.component';
import { UnitTablesComponent } from './views/units/unit-tables/unit-tables.component';
import { ViewMeasurablesComponent } from './views/units/view-measurables/view-measurables.component';
import { UnitConverterComponent } from './views/units/unit-converter/unit-converter.component';
import { AddEditMeasurableComponent } from './views/units/view-measurables/add-edit-measurable/add-edit-measurable.component';
import { AddEditUnitComponent } from './views/units/unit-tables/add-edit-unit/add-edit-unit.component';
import { DocumentViewComponent } from './views/document/document-info/document-view/document-view.component';
import { EditParametersComponent } from './views/shared/document-components/edit/edit-parameters/edit-parameters.component';
import { EditListComponent } from './views/shared/document-components/edit/edit-list/edit-list.component';
import { EditTypeParameterUnitComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter-unit/edit-type-parameter-unit.component';
import { AppSkeletonComponent } from './views/app-skeleton/app-skeleton.component';
import { SkeletonTopBarComponent } from './views/app-skeleton/skeleton-top-bar/skeleton-top-bar.component';
import { SkeletonNavBarComponent } from './views/app-skeleton/skeleton-nav-bar/skeleton-nav-bar.component';
import { CalendarComponent } from './views/timeline/calendar/calendar.component';
import { CalendarSelectComponent } from './views/timeline/calendar/calendar-select/calendar-select.component';
import { CalendarEditComponent } from './views/timeline/calendar/calendar-edit/calendar-edit.component';
import { CalendarDetailComponent } from './views/timeline/calendar/calendar-detail/calendar-detail.component';
import { CardNavComponent } from './views/shared/document-components/navigation/card-nav/card-nav.component';
import { DeleteButtonComponent } from './views/shared/document-components/delete-button/delete-button.component';
import { CalendarPickerComponent } from './views/timeline/calendar/calendar-picker/calendar-picker.component';
import { CalendarPickerButtonComponent } from './views/timeline/calendar/calendar-picker/calendar-picker-button/calendar-picker-button.component';
import { CalendarPickerDaySelectComponent } from './views/timeline/calendar/calendar-picker/calendar-picker-day-select/calendar-picker-day-select.component';
import { CalendarPickerYearSelectComponent } from './views/timeline/calendar/calendar-picker/calendar-picker-year-select/calendar-picker-year-select.component';
import { CalendarPickerEraSelectComponent } from './views/timeline/calendar/calendar-picker/calendar-picker-era-select/calendar-picker-era-select.component';
import { CalendarPickerDropdownComponent } from './views/timeline/calendar/calendar-picker/calendar-picker-dropdown/calendar-picker-dropdown.component';
import { TimelineViewComponent } from './views/timeline/timeline-view/timeline-view.component';
import { BarTimelineViewComponent } from './views/timeline/timeline-view/bar-timeline-view/bar-timeline-view.component';
import { LinearTimelineViewComponent } from './views/timeline/timeline-view/linear-timeline-view/linear-timeline-view.component';
import { CalendarTimelineViewComponent } from './views/timeline/timeline-view/calendar-timeline-view/calendar-timeline-view.component';
import { EditRangeComponent } from './views/shared/document-components/edit/edit-range/edit-range.component';
import { CalendarPickerMonthSelectComponent } from './views/timeline/calendar/calendar-picker/calendar-picker-month-select/calendar-picker-month-select.component';
import { EditDatetimeComponent } from './views/shared/document-components/edit/edit-datetime/edit-datetime.component';
import { CalendarPickerOptionsComponent } from './views/timeline/calendar/calendar-picker/calendar-picker-options/calendar-picker-options.component';
import { BarTimelineListViewComponent } from './views/timeline/timeline-view/bar-timeline-view/bar-timeline-list-view/bar-timeline-list-view.component';
import { EditBigIntComponent } from './views/shared/document-components/edit/edit-big-int/edit-big-int.component';
import { EditTypeParameterTimeComponent } from './views/document/document-type/edit-document-type/edit-type-parameter/edit-type-parameter-time/edit-type-parameter-time.component';
import { ViewDatetimeComponent } from './views/shared/document-components/view/view-datetime/view-datetime.component';
import { ThemeSelectComponent } from './views/theme/theme-select/theme-select.component';
import { ThemeManageComponent } from './views/theme/theme-manage/theme-manage.component';
import { EditSettingsComponent } from './views/shared/edit-settings/edit-settings.component';
import { EditSettingsFieldsComponent } from './views/shared/edit-settings/edit-settings-fields/edit-settings-fields.component';
import { EditSettingsSidebarComponent } from './views/shared/edit-settings/edit-settings-sidebar/edit-settings-sidebar.component';
import { EditSettingComponent } from './views/shared/edit-settings/edit-setting/edit-setting.component';
import { ThemeManageSelectComponent } from './views/theme/theme-manage/theme-manage-select/theme-manage-select.component';
import { RolesComponent } from './views/security/roles/roles.component';
import { UsersComponent } from './views/security/users/users.component';
import { SettingsTopbarComponent } from './views/shared/settings-topbar/settings-topbar.component';
import { EditSelectionListComponent } from './views/shared/edit/edit-selection-list/edit-selection-list.component';
import { EditSelectionTreeComponent } from './views/shared/edit/edit-selection-tree/edit-selection-tree.component';
import { FormDialogComponent } from './views/shared/form-dialog/form-dialog.component';
import { SelectUserComponent } from './views/shared/edit/select-user/select-user.component';
import { MenusComponent } from './views/pages/menus/menus.component';
import { PagesComponent } from './views/pages/pages/pages.component';
import { ViewsComponent } from './views/pages/views/views.component';
import { PageEditorComponent } from './views/pages/pages/page-editor/page-editor.component';
import { RequireRoleDirective } from './directives/security/require-role.directive';
import { CardViewComponent } from './views/pages/views/card-view/card-view.component';
import { GenericViewComponent } from './views/pages/views/generic-view/generic-view.component';
import { QueryEditorComponent } from './views/shared/edit/query-editor/query-editor.component';
import { ListViewComponent } from './views/pages/views/list-view/list-view.component';
import { ViewEditComponent } from './views/pages/views/view-edit/view-edit.component';
import { EditSelectionComponent } from './views/shared/document-components/edit/edit-selection/edit-selection.component';
import { ViewParamComponent } from './views/shared/document-components/view-param/view-param.component';
import { ViewParamStringComponent } from './views/shared/document-components/view-param/view-param-string/view-param-string.component';
import { EditLabelledSelectionListComponent } from './views/shared/edit/edit-labelled-selection-list/edit-labelled-selection-list.component';
import { ViewParamDateComponent } from './views/shared/document-components/view-param/view-param-date/view-param-date.component';
import { ViewParamUnitComponent } from './views/shared/document-components/view-param/view-param-unit/view-param-unit.component';
import { ViewParamDataPointComponent } from './views/shared/document-components/view-param/view-param-data-point/view-param-data-point.component';
import { ViewParamBooleanComponent } from './views/shared/document-components/view-param/view-param-boolean/view-param-boolean.component';
import { DocumentPopupComponent } from './views/shared/document-components/document-popup/document-popup.component';
import { DocumentPresentationComponent } from './views/document/document-presentation/document-presentation.component';
import { PresentationParamComponent } from './views/shared/document-components/presentation-param/presentation-param.component';
import { PresentationParamStringComponent } from './views/shared/document-components/presentation-param/presentation-param-string/presentation-param-string.component';
import { PresentationParamBooleanComponent } from './views/shared/document-components/presentation-param/presentation-param-boolean/presentation-param-boolean.component';
import { PresentationParamDataPointComponent } from './views/shared/document-components/presentation-param/presentation-param-data-point/presentation-param-data-point.component';
import { PresentationParamDateComponent } from './views/shared/document-components/presentation-param/presentation-param-date/presentation-param-date.component';
import { PresentationParamUnitComponent } from './views/shared/document-components/presentation-param/presentation-param-unit/presentation-param-unit.component';
import { PresentationParamsContainerComponent } from './views/shared/document-components/presentation-param/presentation-params-container/presentation-params-container.component';
import { PresentationParamBaseComponent } from './views/shared/document-components/presentation-param/presentation-param-base/presentation-param-base.component';
import { PresentationParamArticleComponent } from './views/shared/document-components/presentation-param/presentation-param-article/presentation-param-article.component';
import { DocumentFormComponent } from './views/document/document-form/document-form.component';
import { FormFieldComponent } from './views/shared/document-components/form-field/form-field.component';
import { FormFieldBasicComponent } from './views/shared/document-components/form-field/form-field-basic/form-field-basic.component';
import { FormFieldArticleComponent } from './views/shared/document-components/form-field/form-field-article/form-field-article.component';
import { FormFieldBooleanComponent } from './views/shared/document-components/form-field/form-field-boolean/form-field-boolean.component';
import { FormFieldDataPointComponent } from './views/shared/document-components/form-field/form-field-data-point/form-field-data-point.component';
import { FormFieldDateComponent } from './views/shared/document-components/form-field/form-field-date/form-field-date.component';
import { FormFieldUnitComponent } from './views/shared/document-components/form-field/form-field-unit/form-field-unit.component';
import { DestroyableComponent } from './views/shared/util/destroyable/destroyable.component';
import { ViewParamArticleComponent } from './views/shared/document-components/view-param/view-param-article/view-param-article.component';
import { EditSettingsPopupComponent } from './views/shared/edit-settings/edit-settings-popup/edit-settings-popup.component';
import { PaginatableComponent } from './views/shared/util/paginatable/paginatable.component';
import { PageListComponent } from './views/pages/pages/page-list/page-list.component';
import { ImageManagerComponent } from './views/storage/image-manager/image-manager.component';
import { ImageUploaderComponent } from './views/storage/image-uploader/image-uploader.component';
import { ImagePickerComponent } from './views/storage/image-picker/image-picker.component';
import { ThumbnailViewComponent } from './views/shared/images/thumbnail-view/thumbnail-view.component';
import { ImageViewerComponent } from './views/storage/image-viewer/image-viewer.component';
import { NgxViewer2Module } from '@jaguards/ngx-viewer2';
import { SecurePipe } from './pipes/secure.pipe';
import { ThumbnailPipe } from './pipes/thumbnail.pipe';
import { ImagePipe } from './pipes/image.pipe';
import { TasksComponent } from './views/storage/tasks/tasks.component';
import { FormFieldListComponent } from './views/shared/document-components/form-field/form-field-list/form-field-list.component';
import { FormFieldListItemComponent } from './views/shared/document-components/form-field/form-field-list-item/form-field-list-item.component';
import { RichtextPipe } from './pipes/richtext.pipe';
import { WorldImportComponent } from './views/administration/world-import/world-import.component';
import { PageViewComponent } from './views/pages/pages/page-view/page-view.component';
import { PageViewElementComponent } from './views/pages/pages/page-view/page-view-element/page-view-element.component';
import { PageSettingsComponent } from './views/pages/pages/page-settings/page-settings.component';
import { FormComponent } from './views/shared/form/form.component';
import { PageElementSettingsComponent } from './views/pages/pages/page-settings/page-element-settings/page-element-settings.component';
import { SkeletonNavBarItemComponent } from './views/app-skeleton/skeleton-nav-bar/skeleton-nav-bar-item/skeleton-nav-bar-item.component';
import { WorldSetupComponent } from './views/world-setup/world-setup.component';
import { FormFieldImageComponent } from './views/shared/document-components/form-field/form-field-image/form-field-image.component';
import { PresentationParamImageComponent } from './views/shared/document-components/presentation-param/presentation-param-image/presentation-param-image.component';
import { ViewComponent } from './views/pages/views/view/view.component';
import { PageViewElementTabgroupComponent } from './views/pages/pages/page-view/page-view-element/page-view-element-tabgroup/page-view-element-tabgroup.component';
import { PageViewElementEditorComponent } from './views/pages/pages/page-view/page-view-element/page-view-element-editor/page-view-element-editor.component';
import { PageElementSettingListItemComponent } from './views/pages/pages/page-settings/page-element-settings/page-element-setting-list-item/page-element-setting-list-item.component';
import { PageHeaderSettingsComponent } from './views/pages/pages/page-settings/page-header-settings/page-header-settings.component';
import { PageViewTopbarComponent } from './views/pages/pages/page-view/page-view-topbar/page-view-topbar.component';
import { PageViewElementSplitcontainerComponent } from './views/pages/pages/page-view/page-view-element/page-view-element-splitcontainer/page-view-element-splitcontainer.component';
import { PageViewElementDocumentComponent } from './views/pages/pages/page-view/page-view-element/page-view-element-document/page-view-element-document.component';
import { PageViewElementDirectoryComponent } from './views/pages/pages/page-view/page-view-element/page-view-element-directory/page-view-element-directory.component';
import { PageViewElementBaseComponent } from './views/pages/pages/page-view/page-view-element/page-view-element-base/page-view-element-base.component';
import { MapViewComponent } from './views/pages/views/map-view/map-view.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    ViewLocationComponent,
    ViewHeiarchyComponent,
    EditLocationComponent,
    ConfirmDialogComponent,
    ErrorToastComponent,
    DocumentComponent,
    DocumentTypeComponent,
    DocumentListComponent,
    DocumentInfoComponent,
    DocumentEditComponent,
    EditBoolComponent,
    EditIntComponent,
    EditDoubleComponent,
    EditStringComponent,
    EditSummaryComponent,
    EditArticleComponent,
    EditDataPointComponent,
    ViewArticleComponent,
    ViewBoolComponent,
    ViewDataPointComponent,
    ViewDoubleComponent,
    ViewIntComponent,
    ViewStringComponent,
    ViewSummaryComponent,
    EditDocumentTypeComponent,
    EditTypeParameterComponent,
    EditDocumentTypePropertiesComponent,
    EditTypeParameterIntComponent,
    EditTypeParameterDoubleComponent,
    EditTypeParameterStringComponent,
    EditTypeParameterSummaryComponent,
    EditTypeParameterDocumentComponent,
    EditTypeParameterImageComponent,
    EditTypeParameterDataPointComponent,
    EditTypeParameterBoolComponent,
    AddDocumentTypeComponent,
    MapSelectComponent,
    MapEditComponent,
    NewMapComponent,
    MapLayersComponent,
    MapEditWindowComponent,
    ValueShortenPipe,
    SearchBarComponent,
    MapAddWindowComponent,
    UploadFileComponent,
    EditMapLayerComponent,
    MapTilesComponent,
    UploadMapTilesComponent,
    LocationTypeComponent,
    EditLocationTypeComponent,
    FilterLocationComponent,
    LoginComponent,
    NewAccountComponent,
    UserSettingsComponent,
    GlobalHomeComponent,
    WorldBrowserComponent,
    AdministrationComponent,
    WorldListComponent,
    WorldManagerComponent,
    WorldCreatorComponent,
    EditColorComponent,
    UserAdministrationComponent,
    DatabaseAdministrationComponent,
    DeploymentAdministrationComponent,
    EditDocumentLocationsComponent,
    ViewLocationParamComponent,
    DocumentFilterComponent,
    UnitsComponent,
    ChangePasswordComponent,
    UnitTablesComponent,
    ViewMeasurablesComponent,
    UnitConverterComponent,
    AddEditMeasurableComponent,
    AddEditUnitComponent,
    ChangePasswordComponent,
    DocumentViewComponent,
    EditParametersComponent,
    EditListComponent,
    EditTypeParameterUnitComponent,
    AppSkeletonComponent,
    SkeletonTopBarComponent,
    SkeletonNavBarComponent,
    CalendarComponent,
    CalendarSelectComponent,
    CalendarEditComponent,
    CalendarDetailComponent,
    CardNavComponent,
    DeleteButtonComponent,
    CalendarPickerComponent,
    CalendarPickerButtonComponent,
    CalendarPickerDaySelectComponent,
    CalendarPickerYearSelectComponent,
    CalendarPickerEraSelectComponent,
    CalendarPickerDropdownComponent,
    TimelineViewComponent,
    BarTimelineViewComponent,
    LinearTimelineViewComponent,
    CalendarTimelineViewComponent,
    EditRangeComponent,
    CalendarPickerMonthSelectComponent,
    EditDatetimeComponent,
    CalendarPickerOptionsComponent,
    BarTimelineListViewComponent,
    EditBigIntComponent,
    EditTypeParameterTimeComponent,
    ViewDatetimeComponent,
    ThemeSelectComponent,
    ThemeManageComponent,
    EditSettingsComponent,
    EditSettingsFieldsComponent,
    EditSettingsSidebarComponent,
    EditSettingComponent,
    ThemeManageSelectComponent,
    RolesComponent,
    UsersComponent,
    SettingsTopbarComponent,
    EditSelectionListComponent,
    EditSelectionTreeComponent,
    FormDialogComponent,
    SelectUserComponent,
    MenusComponent,
    PagesComponent,
    ViewsComponent,
    PageEditorComponent,
    RequireRoleDirective,
    CardViewComponent,
    GenericViewComponent,
    QueryEditorComponent,
    ListViewComponent,
    ViewEditComponent,
    EditSelectionComponent,
    ViewParamComponent,
    ViewParamStringComponent,
    EditLabelledSelectionListComponent,
    ViewParamDateComponent,
    ViewParamUnitComponent,
    ViewParamDataPointComponent,
    ViewParamBooleanComponent,
    DocumentPopupComponent,
    DocumentPresentationComponent,
    PresentationParamComponent,
    PresentationParamStringComponent,
    PresentationParamBooleanComponent,
    PresentationParamDataPointComponent,
    PresentationParamDateComponent,
    PresentationParamUnitComponent,
    PresentationParamsContainerComponent,
    PresentationParamBaseComponent,
    PresentationParamArticleComponent,
    DocumentFormComponent,
    FormFieldComponent,
    FormFieldBasicComponent,
    FormFieldArticleComponent,
    FormFieldBooleanComponent,
    FormFieldDataPointComponent,
    FormFieldDateComponent,
    FormFieldUnitComponent,
    DestroyableComponent,
    ViewParamArticleComponent,
    EditSettingsPopupComponent,
    PaginatableComponent,
    PageListComponent,
    ImageManagerComponent,
    ImageUploaderComponent,
    ImagePickerComponent,
    ThumbnailViewComponent,
    ImageViewerComponent,
    SecurePipe,
    ThumbnailPipe,
    ImagePipe,
    TasksComponent,
    FormFieldListComponent,
    FormFieldListItemComponent,
    RichtextPipe,
    WorldImportComponent,
    PageViewComponent,
    PageViewElementComponent,
    PageSettingsComponent,
    FormComponent,
    PageElementSettingsComponent,
    SkeletonNavBarItemComponent,
    WorldSetupComponent,
    FormFieldImageComponent,
    PresentationParamImageComponent,
    ViewComponent,
    PageViewElementTabgroupComponent,
    PageViewElementEditorComponent,
    PageElementSettingListItemComponent,
    PageHeaderSettingsComponent,
    PageViewTopbarComponent,
    PageViewElementSplitcontainerComponent,
    PageViewElementDocumentComponent,
    PageViewElementDirectoryComponent,
    PageViewElementBaseComponent,
    MapViewComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDividerModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTableModule,
    MatSliderModule,
    MatTreeModule,
    DragDropModule,
    BrowserAnimationsModule,
    NgxEditorModule,
    NgxMatColorPickerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7094", "libratlas.net", "*.libratlas.net"],
        disallowedRoutes: []
      }
    }),
    OverlayModule,
    PortalModule,
    NgxViewer2Module
  ],
  providers: [
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    },
    { 
      provide: MAT_COLOR_FORMATS, 
      useValue: NGX_MAT_COLOR_FORMATS 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
