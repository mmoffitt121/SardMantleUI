import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { MapComponent } from './views/map/map.component';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
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
import { MatMenu, MatMenuModule } from '@angular/material/menu';

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
    DocumentEditComponent
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
    BrowserAnimationsModule,
    NgxEditorModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
