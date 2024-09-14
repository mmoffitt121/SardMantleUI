import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '../../shared/document-components/file/upload-file/upload-file.component';
import { AdminService } from 'src/app/services/administration/admin.service';
import { take } from 'rxjs';
import { QueriedDataPointParameter } from 'src/app/models/document/document-query-result';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-world-import',
  templateUrl: './world-import.component.html',
  styleUrls: ['./world-import.component.scss']
})
export class WorldImportComponent {
  public parameter: QueriedDataPointParameter = {
    typeParameterName: "World Location",
    value: ""
  } as QueriedDataPointParameter;

  public running = false;

  public run() {
    this.running = true;
    this.adminService.importWorldData(this.parameter.value).pipe(take(1)).subscribe(result => {
      this.errorService.showSnackBar("World " + this.parameter.value + " successfully overwritten by import.");
      this.running = false
    }, error => {
      this.errorService.handle(error);
      this.running = false;
    });
  }

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private errorService: ErrorService
  ) { 
  }
}
