import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { categories, tasks } from './mockData';
import { Category, Task } from '../models';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    public actionEmitter: EventEmitter<{ mode: string, task: Task }> = new EventEmitter();
    public activeTask: BehaviorSubject<Task> = new BehaviorSubject(null);

    public getAllTasks(): Task[] {
        return tasks;
    }

    public getAllCategories(): Category[] {
        return categories;
    }

    public createTaskAction(mode: string, task: Task): void {
        this.actionEmitter.emit({
            mode, task
        });
    }

    public setActiveTask(task: Task): void {
        this.activeTask.next(task);
    }
}
