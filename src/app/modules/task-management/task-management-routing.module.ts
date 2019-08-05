import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent, TasksFormComponent } from './components';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: ':mode/:categoryId',
                component: TasksFormComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagementRoutingModule { }

