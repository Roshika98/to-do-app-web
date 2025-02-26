import { Component, ViewChild } from '@angular/core';
import { TaskCreatorComponent } from '../task-creator/task-creator.component';
import { TaskViewerComponent } from '../task-viewer/task-viewer.component';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskCreatorComponent, TaskViewerComponent, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public isSmallScreen: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches));
  }

  public onTaskCreated() {}
}
