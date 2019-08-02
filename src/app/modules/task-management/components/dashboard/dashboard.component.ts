import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public taskItems: { [name: string]: Task[] } = {};

    constructor(private tasksService: TasksService) {
    }

    public ngOnInit() {
        const categories = this.tasksService.getAllCategories();
        const tasks = this.tasksService.getAllTasks();
        categories.forEach(category => {
            this.taskItems[category.title] = tasks.filter(task => task.categoryId === category.id);
        });
        console.log(this.taskItems);
    }

    public drop(event: CdkDragDrop<Task[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    /**
     * Prevent default sorting in key-value pipe
     */
    public keyValueSort(): number {
        return 0;
    }

}
