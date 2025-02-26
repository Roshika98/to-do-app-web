import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { setURIs } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-app';

  constructor() {
    setURIs(window.location.origin);
  }
}
