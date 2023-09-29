import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorToastComponent } from 'src/app/views/shared/error-toast/error-toast.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
    public handle(error: any, duration?: number) {
        console.error(error);
        if (typeof error.error === 'string') {
            this.showSnackBar(error.error, duration);
        }
        else if (error?.error?.errors) {
            this.showSnackBar("One or more validation errors occured.");
        }
        else if (error?.error) {
            this.showSnackBar(error.error);
        }
        else {
            this.showSnackBar(error.message, duration);
        }
    }

    public showSnackBar(message: string, duration?: number) {
        const config: MatSnackBarConfig = {
            panelClass: 'error-toast',
            duration: (duration != null ? duration : 3000),
            data: { message, snackBarRef: null }
        };
        const snackBarRef = this.snackBar.openFromComponent(ErrorToastComponent, config);
        config.data.snackBarRef = snackBarRef;
    }
    constructor(private snackBar: MatSnackBar) { }
}
