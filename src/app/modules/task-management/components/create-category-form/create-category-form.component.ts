import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-category-form',
    templateUrl: './create-category-form.component.html',
    styleUrls: ['./create-category-form.component.scss']
})
export class CreateCategoryFormComponent implements OnInit {
    @Output() public create: EventEmitter<string> = new EventEmitter();
    @Output() public cancel: EventEmitter<void> = new EventEmitter();
    public createForm: FormGroup;

    public ngOnInit() {
        this.createForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(3)])
        });
    }

    public createCategory(): void {
        this.create.emit(this.createForm.value.title);
    }

    public closeForm(): void {
        this.cancel.emit();
    }

}
