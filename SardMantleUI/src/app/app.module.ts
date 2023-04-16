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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent
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
    BrowserAnimationsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
