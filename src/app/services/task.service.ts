import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/response';
import { UpdateTask } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private uri: string = '/tasks';
  constructor(private requestService: RequestService) {}

  public getTasks(): Observable<Response> {
    return this.requestService.getData(this.uri);
  }

  public createTask(task: any): Observable<any> {
    return this.requestService.postData(this.uri, task);
  }

  public updateTask(task: UpdateTask, id: string): Observable<any> {
    return this.requestService.patchData(`${this.uri}/${id}`, task);
  }
}
