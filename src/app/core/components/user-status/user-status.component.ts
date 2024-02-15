import { Component, Input } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-user-status',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './user-status.component.html',
  styleUrl: './user-status.component.scss'
})
export class UserStatusComponent {
  @Input({required: true}) IsOnline: boolean;
}
