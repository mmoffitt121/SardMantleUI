import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimelineComponent } from './views/timeline/timeline.component';
import { HomeComponent } from './views/home/home.component';
import { MapComponent } from './views/map/map.component';
import { DocumentComponent } from './views/document/document.component';
import { EditDocumentTypeComponent } from './views/document/document-type/edit-document-type/edit-document-type.component';
import { NewMapComponent } from './views/map/new-map/new-map.component';
import { MapTilesComponent } from './views/map-tiles/map-tiles.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'home', component:HomeComponent },
  { path:'map', component:MapComponent },
  { path:'map/:mapId', component:MapComponent},
  { path:'map/:mapId/:zoom,:lat,:lng', component:MapComponent },
  { path:'new-map', component:NewMapComponent },
  { path:'map-tiles/:layerId', component:MapTilesComponent },
  { path:'map-tiles/:layerId/:z/:x/:y', component:MapTilesComponent },
  { path:'timeline', component:TimelineComponent },
  { path:'document', component:DocumentComponent },
  { path:'document/:typeId', component:DocumentComponent},
  { path:'document/:typeId/:documentId', component:DocumentComponent},
  { path:'document/type/edit/:id', component:EditDocumentTypeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
