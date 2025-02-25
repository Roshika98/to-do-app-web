import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-viewer',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './task-viewer.component.html',
  styleUrl: './task-viewer.component.scss',
})
export class TaskViewerComponent implements OnInit {
  public taskList: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskList = [
      {
        id: 1,
        title: 'Task 1',
        description: 'This is task 1',
        status: 'Pending',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'This is task 2',
        status: 'Pending',
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'This is task 3',
        status: 'Pending',
      },
      {
        id: 4,
        title: 'Task 4',
        description: 'This is task 4',
        status: 'Pending',
      },
      {
        id: 5,
        title: 'Task 5',
        description: 'This is task 5',
        status: 'Pending',
      },
    ];
  }

  public updateTaskStatus(task: any): void {
    const index = this.taskList.findIndex((t) => t.id === task.id);
    this.taskList[index].status = 'Completed';
  }

  public getAllTasks() {
    const taskRetriever = new Observable();
  }
}
