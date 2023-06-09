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
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    EditTypeParameterBoolComponent
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
    DragDropModule,
    BrowserAnimationsModule,
    NgxEditorModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
