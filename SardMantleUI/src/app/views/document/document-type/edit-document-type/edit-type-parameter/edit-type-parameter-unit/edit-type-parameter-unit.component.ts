import { ChangeDetectorRef, Component } from '@angular/core';
import { DocumentTypeParameter } from 'src/app/models/document/document-types/document-type';
import { Unit } from 'src/app/models/units/unit';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { ErrorService } from 'src/app/services/error.service';
import { UnitsService } from 'src/app/services/units/units.service';

@Component({
  selector: 'app-edit-type-parameter-unit',
  templateUrl: './edit-type-parameter-unit.component.html',
  styleUrls: ['./edit-type-parameter-unit.component.scss']
})
export class EditTypeParameterUnitComponent {
  public units: Unit[];
  public unit: Unit | undefined;
  public documentTypeParameter: DocumentTypeParameter;

  public setValues(p: DocumentTypeParameter) {
    this.documentTypeParameter = p;
    this.unitsService.get({}).subscribe(data => {
      this.units = data;
      this.unit = this.units?.find(u => u.id == p.dataPointTypeReferenceId) ?? undefined;
    }, error => this.errorService.handle(error));
  }

  public select(e: any) {
    if (e === undefined) return;
    this.documentTypeParameter.dataPointTypeReferenceId = e.id;
  }

  public constructor (private unitsService: UnitsService, private errorService: ErrorService, private typeService: DocumentTypeService) {}
}
