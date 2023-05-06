import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as mt from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { AddLocationComponent } from './map/add-location/add-location/add-location.component';
import { ViewLocationComponent } from './map/view-location/view-location.component';
import { ViewHeiarchyComponent } from './map/view-location/view-heiarchy/view-heiarchy.component';
import { EditLocationComponent } from './map/edit-location/edit-location.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    AddLocationComponent,
    ViewLocationComponent,
    ViewHeiarchyComponent,
    EditLocationComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    mt.MatButtonToggleModule,
    mt.MatSlideToggleModule,
    mt.MatCardModule,
    mt.MatButtonModule,
    mt.MatInputModule,
    mt.MatFormFieldModule,
    mt.MatExpansionModule,
    mt.MatDividerModule,
    mt.MatSidenavModule,
    mt.MatTabsModule,
    mt.MatIconModule,
    mt.MatCheckboxModule,
    mt.MatSelectModule,
    mt.MatAutocompleteModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
