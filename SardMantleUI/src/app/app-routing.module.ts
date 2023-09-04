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
import { ManageThemesComponent } from './views/home/top-bar/manage-themes/manage-themes.component';

const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full' },
  { path:'login', component:LoginComponent },
  { path:'register', component:NewAccountComponent },
  { path:'user-settings', component:UserSettingsComponent, canActivate: [AuthGuard] },
  { path:'world-manager', component:WorldManagerComponent, canActivate: [AuthGuard] },
  { path:'world-browser', component:WorldBrowserComponent},
  { path:'home', component:GlobalHomeComponent },
  { path:'worlds', component:WorldBrowserComponent },
  { path:'administration', component:AdministrationComponent },
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
    { path:'document', component:DocumentComponent },
    { path:'document/:typeId', component:DocumentComponent },
    { path:'document/:typeId/:documentId', component:DocumentComponent },
    { path:'document/type/edit/:id', component:EditDocumentTypeComponent, canActivate: [AuthGuard] },
    { path:'settings/theme', component:ManageThemesComponent },
    { path:'settings/theme/:id', component:ManageThemesComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
