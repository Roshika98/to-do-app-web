import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedTaskService {
  private source = new Subject<void>();
  public sharedTaskObservable = this.source.asObservable();

  constructor() {}

  triggerTaskRefresh() {
    this.source.next();
  }
}
