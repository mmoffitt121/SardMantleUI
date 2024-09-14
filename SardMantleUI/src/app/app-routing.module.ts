import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';

import { TimelineComponent } from './views/timeline/timeline.component';
import { HomeComponent } from './views/home/home.component';
import { MapComponent } from './views/map/map.component';
import { DocumentComponent } from './views/document/document.component';
import { EditDocumentTypeComponent } from './views/document/document-type/edit-document-type/edit-document-type.component';
import { NewMapComponent } from './views/map/new-map/new-map.component';
import { MapTilesComponent } from './views/map-tiles/map-tiles.component';
import { LoginComponent } from './views/auth/login/login.component';
import { NewAccountComponent } from './views/auth/new-account/new-account.component';
import { UserSettingsComponent } from './views/auth/user-settings/user-settings.component';
import { WorldBrowserComponent } from './views/common/world-browser/world-browser.component';
import { AdministrationComponent } from './views/administration/administration.component';
import { GlobalHomeComponent } from './views/common/global-home/global-home.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { WorldManagerComponent } from './views/common/world-manager/world-manager.component';
import { UnitsComponent } from './views/units/units.component';
import { CalendarComponent } from './views/timeline/calendar/calendar.component';
import { DocumentTypeComponent } from './views/document/document-type/document-type.component';
import { ThemeManageComponent } from './views/theme/theme-manage/theme-manage.component';
import { RolesComponent } from './views/security/roles/roles.component';
import { UsersComponent } from './views/security/users/users.component';
import { PagesComponent } from './views/pages/pages/pages.component';
import { MenusComponent } from './views/pages/menus/menus.component';
import { ViewsComponent } from './views/pages/views/views.component';
import { ImageManagerComponent } from './views/storage/image-manager/image-manager.component';
import { TasksComponent } from './views/storage/tasks/tasks.component';

const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full' },
  { path:'login', component:LoginComponent },
  { path:'register', component:NewAccountComponent },
  { path:'user-settings', component:UserSettingsComponent, canActivate: [AuthGuard] },
  { path:'world-manager', component:WorldManagerComponent, canActivate: [AuthGuard] },
  { path:'world-browser', component:WorldBrowserComponent},
  { path:'home', component:GlobalHomeComponent },
  { path:'worlds', component:WorldBrowserComponent },
  { path:'administration', component:AdministrationComponent, canActivate: [AuthGuard] },
  { path:':world', redirectTo: ':world/home', pathMatch: 'full' },
  { path:':world', children: [ 
    { path:'home', component:HomeComponent },
    { path:'map', component:MapComponent },
    { path:'map/:mapId', component:MapComponent},
    { path:'map/:mapId/:locationId', component:MapComponent },
    { path:'map/:mapId/:zoom/:lat/:lng', component:MapComponent },
    { path:'map/:mapId/:zoom/:lat/:lng/:locationId', component:MapComponent },
    { path:'new-map', component:NewMapComponent },
    { path:'map-tiles/:layerId', component:MapTilesComponent },
    { path:'map-tiles/:layerId/:z/:x/:y', component:MapTilesComponent },
    { path:'timeline', component:TimelineComponent },
    { path:'calendar', component:CalendarComponent },
    { path:'units', component:UnitsComponent },
    { path:'document', component:DocumentComponent },
    { path:'document/search', component:DocumentComponent },
    { path:'document/results', component:DocumentComponent },
    { path:'document/view', component:DocumentComponent },
    { path:'document/view/:docId', component:DocumentComponent },
    { path:'document/view/:docId', component:DocumentComponent },
    { path:'document/view/:docId', component:DocumentComponent },
    { path:'document/view/:docId', component:DocumentComponent },
    { path:'document/add', component:DocumentComponent },
    { path:'document/add/:docTypeId', component:DocumentComponent },
    { path:'document/edit', component:DocumentComponent },
    { path:'document/edit/:docId', component:DocumentComponent },
    { path:'document/duplicate/:docId', component:DocumentComponent },
    { path:'document-type', component:DocumentTypeComponent },
    { path:'document-type/edit/:id', component:EditDocumentTypeComponent },
    { path:'theme', component:ThemeManageComponent },
    { path:'theme/:id', component:ThemeManageComponent },
    { path:'roles', component:RolesComponent },
    { path:'users', component:UsersComponent },
    { path:'pages', component:PagesComponent },
    { path:'menus', component:MenusComponent },
    { path:'views', component:ViewsComponent },
    { path:'images', component:ImageManagerComponent },
    { path:'usage', component:ImageManagerComponent },
    { path:'tasks', component:TasksComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
