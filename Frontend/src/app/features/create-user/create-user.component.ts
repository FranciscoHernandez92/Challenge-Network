import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    @if (!showForm) {
    <button type="button" (click)="displayFormCreate()">Create User</button>
    } @else {
    <h2>Create User</h2>
    <form [formGroup]="formCreate">
      <label>Username: <input type="text" formControlName="username" /></label>
      <label>Name: <input type="text" formControlName="name" /></label>
      <label
        >Birthdate: <input type="datetime" formControlName="birthDate"
      /></label>
      <label>Username: <input type="text" formControlName="username" /></label>
      <label
        >Password: <input type="password" formControlName="password"
      /></label>

      <button type="submit" [disabled]="formCreate.invalid">Submit</button>
    </form>
    }
  `,
  styles: ``,
})
export class CreateUserComponent {
  showForm: boolean = false;
  private state = inject(StateService);
  private fb = inject(FormBuilder);
  formCreate = this.fb.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    birthDate: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  displayFormCreate() {
    this.showForm = true;
    this.state.showForm(true);
  }
}
