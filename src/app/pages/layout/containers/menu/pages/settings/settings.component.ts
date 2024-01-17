import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from "rxjs/operators";

import { AccordionModule, AccordionTabCloseEvent } from 'primeng/accordion';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from "primeng/inputswitch";

import { ImageComponent } from "@core/components";
import { AuthService, ConfigService } from "@app/core";
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
export class SettingsComponent implements OnInit {
  public user: any;

  public isEditMode: boolean = false;

  public personalInfoForm: FormGroup<IPersonalInfoForm> = new FormGroup<IPersonalInfoForm>({
    Name: new FormControl<string>(null, [
      Validators.required
    ]),
    Surname: new FormControl<string>(null),
    Username: new FormControl<string>(null, [
      Validators.required
    ]),
    Mail: new FormControl<string>(null, [
      Validators.required,
      Validators.email
    ]),
  });

  public appearanceForm: FormGroup<IAppearanceForm> = new FormGroup<IAppearanceForm>({
    IsDarkTheme: new FormControl<boolean>(null, [
      Validators.required
    ]),
    ThemeColor: new FormControl<string>(null, [
      Validators.required
    ])
  });

  public prefixedThemeColors: { Color: string }[] = this.configService.prefixedThemeColors;

  public isCustomThemeColor: boolean = false;

  constructor(
    public configService: ConfigService,
    public authService: AuthService,
    private settingsService: SettingsService,
  ) {
    this.initThemeSettings();
    this.checkThemeColor();
  }

  ngOnInit(): void {
    this.setUserData();
  }

  private setUserData(): void {
    this.authService.userData$
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.user = user;
          this.setAppearanceData();
        }
      });
  }

  private setAppearanceData(): void {
    this.configService.Theme$.next(this.user?.AppearanceSettings?.Theme);
    this.configService.ThemeColor = this.user?.AppearanceSettings?.ThemeColor;
    this.appearanceForm.patchValue(this.user?.AppearanceSettings);
  }

  public enableEditMode(): void {
    this.isEditMode = true;
    this.personalInfoForm.patchValue(this.user);
  }

  public cancelEditMode(): void {
    this.isEditMode = false;

    this.personalInfoForm.reset();
  }

  public onSave(): void {
    if (this.personalInfoForm.invalid || this.personalInfoForm.pristine) {
      return this.personalInfoForm.markAllAsTouched();
    }

    this.settingsService.editUser(this.user.Id, this.personalInfoForm.value)
      .pipe(take(1))
      .subscribe({
        next: (res: any): void => {
          this.authService.userData$.next(res);
          this.user = res;
          this.isEditMode = false;
        },
        error: (err): void => {
          console.group('HTTP Error')
          console.log('Something Went Wrong In \'editUser\'');
          console.log(err);
          console.groupEnd();
        }
      });
  }

  public changeBackgroundPicture(): void {

  }

  public changeAvatarPicture(): void {

  }

  private checkThemeColor(): void {
    this.isCustomThemeColor = this.prefixedThemeColors
      .find(c => c.Color === this.appearanceForm.value.ThemeColor) === undefined;
  }

  public changeThemeColor(prefixedColor?: string): void {
    const isNotPrefixedColor: boolean = this.prefixedThemeColors
      .some(prefixedColor => this.appearanceForm.value.ThemeColor === prefixedColor.Color);

    if (prefixedColor) {
      this.isCustomThemeColor = false;
      this.appearanceForm.controls.ThemeColor.setValue(prefixedColor);
      this.configService.changeThemeColor(this.appearanceForm.value.ThemeColor, true);
    } else if (!isNotPrefixedColor) {
      this.isCustomThemeColor = true;
      this.configService.changeThemeColor(this.appearanceForm.value.ThemeColor, true);
    }

  }

  private initThemeSettings(): void {
    this.appearanceForm.controls.IsDarkTheme
      .setValue(this.configService.Theme$.getValue() === 'dark');

    this.appearanceForm.controls.ThemeColor
      .setValue(this.configService.ThemeColor);
  }

  public onAccordionClose(e: AccordionTabCloseEvent): void {
    if (e.index === 0) {
      this.personalInfoForm.reset();
      this.isEditMode = false;
    }
  }
}
