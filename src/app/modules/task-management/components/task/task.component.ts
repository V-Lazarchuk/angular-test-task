import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
    @Input() task: Task;
    @Output() delete: EventEmitter<number> = new EventEmitter();

    deleteTask(event: MouseEvent): void {
        event.stopPropagation();
        this.delete.emit(this.task.id);
    }
}
