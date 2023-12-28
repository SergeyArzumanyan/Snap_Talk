import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    AccordionModule,
    ColorPickerModule,
    InputTextModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  constructor() {}
}
