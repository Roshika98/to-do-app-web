import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private matSnackBar!: MatSnackBar;
  private template!: TemplateRef<any>;
  constructor() {}

  setMatSnackBar(matSnackBar: MatSnackBar, template: TemplateRef<any>) {
    this.matSnackBar = matSnackBar;
    template = template;
  }

  showMessage(
    message: string,
    action: string = 'Close',
    config?: MatSnackBarConfig
  ) {
    if (this.matSnackBar) {
      this.matSnackBar.open(message, action, config);
      // this.matSnackBar.openFromTemplate(this.template, {
      //   ...config,
      //   data: { message },
      // });
    } else console.log('MatSnackBar not set');
  }

  showError(message: string) {
    this.showMessage(message, 'close', {
      panelClass: 'snackbar-error',
      verticalPosition: 'top',
    });
  }

  showSuccess(message: string) {
    this.showMessage(message, 'close', {
      panelClass: 'snackbar-success',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  showInfo(message: string) {
    this.showMessage(message, 'close', {
      panelClass: 'snackbar-info',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  showWarning(message: string) {
    this.showMessage(message, 'close', {
      panelClass: 'snackbar-warning',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
