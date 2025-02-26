import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { TaskService } from '../../services/task.service';
import { Task, UpdateTask } from '../../interfaces/task';
import { SharedTaskService } from '../../services/shared-task.service';

@Component({
  selector: 'app-task-viewer',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './task-viewer.component.html',
  styleUrl: './task-viewer.component.scss',
})
export class TaskViewerComponent implements OnInit {
  public taskList: Task[] = [];

  constructor(
    private taskService: TaskService,
    private sharedTaskService: SharedTaskService
  ) {}

  ngOnInit(): void {
    this.sharedTaskService.sharedTaskObservable.subscribe({
      next: () => {
        this.getAllTasks();
      },
    });
    this.getAllTasks();
  }

  public updateTaskStatus(taskId: string): void {
    const updateAttrs: UpdateTask = { status: 'DONE' };
    this.taskService.updateTask(updateAttrs, taskId).subscribe({
      next: (response) => {
        this.getAllTasks();
      },
    });
  }

  private getAllTasks() {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.taskList = response.data as Task[];
      },
    });
  }
}
