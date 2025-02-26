import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task, UpdateTask } from '../../interfaces/task';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-viewer',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './task-viewer.component.html',
  styleUrl: './task-viewer.component.scss',
})
export class TaskViewerComponent implements OnInit {
  public taskList: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  public updateTaskStatus(taskId: string): void {
    const updateAttrs: UpdateTask = { status: 'DONE' };
    this.taskService.updateTask(updateAttrs, taskId).subscribe({
      next: (response) => {
        console.log('Task updated:', response);
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
