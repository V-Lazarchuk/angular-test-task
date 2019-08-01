import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagementRoutingModule } from './task-management-routing.module';
import { DashboardComponent } from './components';
import { TasksColumnComponent } from './components/tasks-column/tasks-column.component';
import { TaskComponent } from './components/task/task.component';
import { TasksFormComponent } from './components/tasks-form/tasks-form.component';

@NgModule({
    declarations: [
        DashboardComponent,
        TasksColumnComponent,
        TaskComponent,
        TasksFormComponent
    ],
    imports: [
        CommonModule,
        TaskManagementRoutingModule
    ]
})
export class TaskManagementModule {
}
