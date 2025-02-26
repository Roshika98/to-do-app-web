import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TaskViewerComponent } from './components/task-viewer/task-viewer.component';
import { TaskCreatorComponent } from './components/task-creator/task-creator.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'tasks',
    component: TaskViewerComponent,
  },
  {
    path: 'new-task',
    component: TaskCreatorComponent,
  },
];
