import { Injectable } from '@angular/core';

import { categories, tasks } from './mockData';
import { Category, Task} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

    public getAllTasks(): Task[] {
        return tasks;
    }

    public getAllCategories(): Category[] {
        return categories;
    }
}
