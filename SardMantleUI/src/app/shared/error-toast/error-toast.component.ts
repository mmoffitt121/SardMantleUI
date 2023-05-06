import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.css']
})
export class ErrorToastComponent  {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  dismiss(): void {
    // Call the snackbar's dismiss method
    this.data.snackBarRef.dismiss();
  }
}
