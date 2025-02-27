import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { setURIs } from '../environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('snackbarTemplate') snackbarTemplate!: TemplateRef<any>;
  title = 'todo-app';
  public snackBar!: MatSnackBar;
  constructor(
    private snackBarService: SnackbarService,
    private matSnackBar: MatSnackBar
  ) {
    setURIs(window.location.origin);
    snackBarService.setMatSnackBar(matSnackBar, this.snackbarTemplate);
    this.snackBar = matSnackBar;
  }
}
