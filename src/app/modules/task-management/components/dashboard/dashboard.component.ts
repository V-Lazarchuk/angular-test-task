import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { TasksService } from '../../services/tasks.service';
import { Category, Task } from '../../models';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public taskItems: { [name: number]: Task[] } = {};
    public showCreateCategoryForm: boolean = false;

    private categories: Category[];

    constructor(private tasksService: TasksService) {
    }

    public ngOnInit() {
        this.categories = this.tasksService.getAllCategories();
        const tasks = this.tasksService.getAllTasks();
        this.categories.forEach(category => {
            this.taskItems[category.id] = tasks.filter(task => task.categoryId === category.id);
        });
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

    public addNewCategory(title: string): void {
        const id = Math.max(...this.categories.map(item => item.id)) + 1;
        this.showCreateCategoryForm = false;
        this.categories.push({
            title,
            id
        });
        this.taskItems[id] = [];
    }

    private getCategoryName(id: string): string {
        return this.categories.find(item => item.id === Number(id)).title;
    }

    /**
     * Prevent default sorting in key-value pipe
     */
    public keyValueSort(): number {
        return 0;
    }

}
