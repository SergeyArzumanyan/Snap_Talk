import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { ButtonModule } from "primeng/button";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext";
import { DynamicDialogRef } from "primeng/dynamicdialog";

import { IAddGroupForm } from "../../interfaces";

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
  ],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.scss'
})
export class AddGroupComponent {
  public addGroupForm: FormGroup<IAddGroupForm> = new FormGroup<IAddGroupForm>({
    Name: new FormControl(null, [
      Validators.required,
    ]),
    Members: new FormControl(null, [
      Validators.required,
    ])
  });

  public users: any[] = [
    {
      Id: 1,
      FullName: 'First User',
    },
    {
      Id: 2,
      FullName: 'Second User',
    }
  ];

  constructor(
    private ref: DynamicDialogRef,
  ) {}

  public cancel(): void {
    this.ref.close();
  }

  public onAdd(): void {
    if (this.addGroupForm.invalid) {
      return this.addGroupForm.markAllAsTouched();
    }


  }
}
