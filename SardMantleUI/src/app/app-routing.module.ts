import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimelineComponent } from './views/timeline/timeline.component';
import { HomeComponent } from './views/home/home.component';
import { MapComponent } from './views/map/map.component';
import { DocumentComponent } from './views/document/document.component';
import { EditDocumentTypeComponent } from './views/document/document-type/edit-document-type/edit-document-type.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'home', component:HomeComponent },
  { path:'map', component:MapComponent },
  { path:'timeline', component:TimelineComponent },
  { path:'document', component:DocumentComponent },
  { path:'document/type/edit/:id', component:EditDocumentTypeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
