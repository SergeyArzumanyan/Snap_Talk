import { Component } from '@angular/core';
import { NgClass, NgStyle } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AccordionModule, AccordionTabCloseEvent } from 'primeng/accordion';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from "primeng/inputswitch";

import { ImageComponent } from "@core/components";
import { ConfigService } from "@app/core";
import {
  IAppearanceForm,
  IPersonalInfoForm,
} from "./interfaces";
import { SettingsService } from "./services";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AccordionModule,
    ColorPickerModule,
    InputTextModule,
    InputSwitchModule,
    FormsModule,
    ImageComponent,
    NgClass,
    NgStyle,
  ],
  providers: [
    SettingsService
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  public isEditMode: boolean = false;

  public personalInfoForm: FormGroup<IPersonalInfoForm> = new FormGroup<IPersonalInfoForm>({
    Name: new FormControl<string>('', [
      Validators.required
    ]),
    Surname: new FormControl<string>(''),
    Username: new FormControl<string>('', [
      Validators.required
    ]),
    Mail: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
  });

  public appearanceForm: FormGroup<IAppearanceForm> = new FormGroup<IAppearanceForm>({
    IsDarkMode: new FormControl<boolean | null>(null, [
      Validators.required
    ]),
    MainColor: new FormControl<string>('', [
      Validators.required
    ])
  });

  public prefixedThemeColors: { Color: string }[] = this.configService.prefixedThemeColors;

  public isCustomThemeColor: boolean = false;

  constructor(
    public configService: ConfigService,
    private settingsService: SettingsService,
  ) {
    this.initThemeSettings();
    this.checkThemeColor();
  }

  public enableEditMode(): void {
    this.isEditMode = true;
  }

  public cancelEditMode(): void {
    this.isEditMode = false;

    this.personalInfoForm.reset();
  }

  public onSave(): void {
    if (this.personalInfoForm.invalid) {
      return this.personalInfoForm.markAllAsTouched();
    }
  }

  public changeBackgroundPicture(): void {

  }

  public changeAvatarPicture(): void {

  }

  private checkThemeColor(): void {
    this.isCustomThemeColor = this.prefixedThemeColors
      .find(c => c.Color === this.appearanceForm.value.MainColor) === undefined;
  }

  public changeMainColor(prefixedColor?: string): void {
    const isNotPrefixedColor: boolean = this.prefixedThemeColors
      .some(prefixedColor => this.appearanceForm.value.MainColor === prefixedColor.Color);

    if (prefixedColor) {
      this.isCustomThemeColor = false;
      this.appearanceForm.controls.MainColor.setValue(prefixedColor);
    } else if (!isNotPrefixedColor) {
      this.isCustomThemeColor = true;
    }

    this.configService.changeThemeColor(this.appearanceForm.value.MainColor!);
  }

  private initThemeSettings(): void {
    this.appearanceForm.controls.IsDarkMode
      .setValue(this.configService.colorScheme$.getValue() === 'dark');

    this.appearanceForm.controls.MainColor
      .setValue(this.configService.themeColor);
  }

  public onAccordionClose(e: AccordionTabCloseEvent): void {
    if (e.index === 0) {
      this.personalInfoForm.reset();
      this.isEditMode = false;
    }
  }
}
