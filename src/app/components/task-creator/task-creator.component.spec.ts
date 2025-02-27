import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCreatorComponent } from './task-creator.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TaskService } from '../../services/task.service';
import { SharedTaskService } from '../../services/shared-task.service';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('TaskCreatorComponent', () => {
  let component: TaskCreatorComponent;
  let fixture: ComponentFixture<TaskCreatorComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let sharedTaskService: jasmine.SpyObj<SharedTaskService>;

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', ['createTask']);
    sharedTaskService = jasmine.createSpyObj('SharedTaskService', [
      'triggerTaskRefresh',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        TaskCreatorComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        HttpClientTestingModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TaskService, useValue: taskService },
        { provide: SharedTaskService, useValue: sharedTaskService },
        // { provide: HttpClient, useValue: provideHttpClientTesting() },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.taskForm;
    expect(form).toBeTruthy();
    expect(form.get('title')?.value).toBe('');
    expect(form.get('description')?.value).toBe('');
    expect(form.get('dueDate')?.value).toBeInstanceOf(Date);
  });

  it('should be invalid when form is empty', () => {
    component.taskForm.controls['title'].setValue('');
    component.taskForm.controls['description'].setValue('');
    component.taskForm.controls['dueDate'].setValue(null);

    expect(component.taskForm.invalid).toBeTrue();
  });

  it('should be valid when form is filled correctly', () => {
    component.taskForm.controls['title'].setValue('Task title');
    component.taskForm.controls['description'].setValue('Task description');
    component.taskForm.controls['dueDate'].setValue(new Date());

    expect(component.taskForm.valid).toBeTrue();
  });

  it('should call createTask service method when form is valid', () => {
    component.taskForm.controls['title'].setValue('Task title');
    component.taskForm.controls['description'].setValue('Task description');
    component.taskForm.controls['dueDate'].setValue(new Date());

    taskService.createTask.and.returnValue(of({}));
    component.createTask();

    expect(taskService.createTask).toHaveBeenCalledOnceWith({
      title: 'Task title',
      description: 'Task description',
      dueDate: jasmine.any(String),
    });
    expect(sharedTaskService.triggerTaskRefresh).toHaveBeenCalled();
    expect(component.taskForm.pristine).toBeTrue();
  });

  it('should reset the form after task is created', () => {
    component.taskForm.controls['title'].setValue('Task title');
    component.taskForm.controls['description'].setValue('Task description');
    component.taskForm.controls['dueDate'].setValue(new Date());

    taskService.createTask.and.returnValue(of({}));
    component.createTask();

    expect(component.taskForm.controls['title'].value).toBe('');
    expect(component.taskForm.controls['description'].value).toBe('');
    expect(component.taskForm.controls['dueDate'].value).toBeInstanceOf(Date);
  });

  it('should not call createTask service if form is invalid', () => {
    component.taskForm.controls['title'].setValue('');
    component.taskForm.controls['description'].setValue('');
    component.taskForm.controls['dueDate'].setValue(null);

    component.createTask();

    expect(taskService.createTask).not.toHaveBeenCalled();
  });
});
