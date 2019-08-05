import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';

@Component({
    selector: 'app-tasks-form',
    templateUrl: './tasks-form.component.html',
    styleUrls: ['./tasks-form.component.scss']
})
export class TasksFormComponent implements OnInit {
    private task: Task;
    public mode: string;
    public taskForm: FormGroup;

    private categoryId: number;

    constructor(private route: ActivatedRoute,
                private location: Location,
                private tasksService: TasksService) {
    }

    ngOnInit() {
        const params = this.route.snapshot.params;
        this.mode = params.mode;
        this.categoryId = params.categoryId;
        if (this.mode === 'add') {
            this.initForm();
        } else if (this.mode === 'edit') {
            this.tasksService.activeTask.subscribe(task => {
                if (task) {
                    this.task = task;
                    this.initForm();
                    this.taskForm.addControl('id', new FormControl(this.task.id));
                }
            });
        }
    }

    goBack(): void {
        this.location.back();
    }

    public submitForm(): void {
        this.tasksService.createTaskAction(this.mode, this.taskForm.value);
        this.location.back();
    }

    private initForm(): void {
        this.taskForm = new FormGroup({
            categoryId: new FormControl(this.categoryId),
            title: this.createControl(this.mode, 'title'),
            description: this.createControl(this.mode, 'description')
        });
    }

    private createControl(mode: string, name: string): FormControl {
        return new FormControl(mode === 'add' ? '' : this.task[name], [Validators.required, Validators.minLength(3)]);
    }

}
