import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibraryComponent } from './library/library.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  {path:'library',component:LibraryComponent},
  {path:'timeline',component:TimelineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
