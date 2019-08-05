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
    public showCreateCategoryForm: boolean = false;
    public categories: Category[];
    public taskItems: { [name: number]: Task[] } = {};

    constructor(private tasksService: TasksService) {
    }

    public ngOnInit() {
        this.categories = this.tasksService.getAllCategories();
        const tasks = this.tasksService.getAllTasks();
        this.tasksService.actionEmitter.subscribe(data => {
            if (data.mode === 'add') {
                this.addNewTask(data.task);
            } else if (data.mode === 'edit') {
                this.updateTask(data.task);
            }
        });
        this.categories.forEach(category => {
            this.taskItems[category.id] = tasks.filter(task => task.categoryId === category.id);
        });
    }


    public dropTask(event: CdkDragDrop<Task[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    public dropCategory(event: CdkDragDrop<Category[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    public addNewCategory(title: string): void {
        /**
         * Calculating and checking new ID for new category
         */
        let id = Math.max(...this.categories.map(item => item.id)) + 1;
        if (!isFinite(id)) {
            id = 1;
        }
        this.showCreateCategoryForm = false;
        this.categories.push({
            title,
            id
        });
        this.taskItems[id] = [];
    }

    public getConnectionList(): string[] {
        return this.categories.map(item => `${item.id}`);
    }

    public setActiveTask(task: Task): void {
        this.tasksService.setActiveTask(task);
    }

    public removeCategory(id: number): void {
        this.categories.splice(this.categories.findIndex(item => item.id === id), 1);
        this.taskItems[id] = null;
    }

    public deleteTask(categoryId: number, taskId: number): void {
        this.taskItems[categoryId].splice(this.taskItems[categoryId].findIndex(item => item.id === taskId), 1);
    }

    private addNewTask(task: Task): void {
        /**
         * Calculating ID for new task
         */
        const id = Math.max(...(Object.keys(this.taskItems)
            .reduce((arr, key) => arr.concat(this.taskItems[key]), []).map(item => item ? item.id : 0))) + 1;
        const newTask = {
            ...task,
            categoryId: Number(task.categoryId),
            id
        };
        this.taskItems[task.categoryId].push(newTask);
    }

    private updateTask(task: Task): void {
        const index = this.taskItems[task.categoryId].findIndex(item => item.id === task.id);
        this.taskItems[task.categoryId].splice(index, 1, {
            ...task,
            id: Number(task.id),
            categoryId: Number(task.categoryId)
        });
    }

}
