import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TaskManagementRoutingModule } from './task-management-routing.module';
import { DashboardComponent, TaskComponent, TasksFormComponent } from './components';

@NgModule({
    declarations: [
        DashboardComponent,
        TaskComponent,
        TasksFormComponent
    ],
    imports: [
        CommonModule,
        TaskManagementRoutingModule,
        DragDropModule
    ]
})
export class TaskManagementModule {
}
