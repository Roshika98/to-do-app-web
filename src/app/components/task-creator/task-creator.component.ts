import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../services/task.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-task-creator',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './task-creator.component.html',
  styleUrl: './task-creator.component.scss',
})
export class TaskCreatorComponent {
  @Output() public taskCreated = new EventEmitter<void>();
  public taskForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.formbuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [new Date(), Validators.required],
    });
  }

  public createTask(): void {
    if (this.taskForm.valid) {
      const { dueDate, ...params } = this.taskForm.value;
      this.taskService
        .createTask({ ...params, dueDate: dueDate.toISOString() })
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.taskCreated.emit();
          },
        });
    }
  }

  private resetForm() {
    this.taskForm.markAsPristine();
    this.taskForm.markAsUntouched();
    this.taskForm.reset();
    this.taskForm.patchValue({
      dueDate: new Date(),
      title: '',
      description: '',
    });
  }
}
