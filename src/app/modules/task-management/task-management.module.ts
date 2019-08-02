import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TaskManagementRoutingModule } from './task-management-routing.module';
import { CreateCategoryFormComponent, DashboardComponent, TaskComponent, TasksFormComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DashboardComponent,
        TaskComponent,
        TasksFormComponent,
        CreateCategoryFormComponent
    ],
    imports: [
        CommonModule,
        TaskManagementRoutingModule,
        DragDropModule,
        ReactiveFormsModule
    ]
})
export class TaskManagementModule {
}
