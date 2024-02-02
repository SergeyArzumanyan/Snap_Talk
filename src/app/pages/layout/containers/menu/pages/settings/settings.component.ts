import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgStyle } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from "rxjs/operators";
import { Subject, takeUntil } from "rxjs";

import { AccordionModule, AccordionTabCloseEvent } from 'primeng/accordion';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from "primeng/inputswitch";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

import { ImageComponent, ImageSelectComponent } from "@core/components";
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
    AsyncPipe,
    ImageComponent,
  ],
  providers: [
    SettingsService,
    DynamicDialogRef,
    DialogService,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit, OnDestroy {
  public user: any;

  public isEditMode: boolean = false;

  public personalInfoForm: FormGroup<IPersonalInfoForm> = new FormGroup<IPersonalInfoForm>({
    FullName: new FormControl<string>(null, [
      Validators.required
    ]),
    Username: new FormControl<string>(null, [
      Validators.required
    ]),
    Email: new FormControl<string>(null, [
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

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public configService: ConfigService,
    public authService: AuthService,
    private settingsService: SettingsService,
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
  ) {
    this.initThemeSettings();
    this.checkThemeColor();
  }

  ngOnInit(): void {
    this.setUserData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setUserData(): void {
    this.authService.userData$
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.user = user;
          this.appearanceForm.patchValue(this.user?.AppearanceSettings);
        }
      });
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
          this.personalInfoForm.reset();
        },
        error: (err): void => {
          console.group('HTTP Error')
          console.log('Something Went Wrong In \'editUser\'');
          console.log(err);
          console.groupEnd();
        }
      });
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

  public onFileUpload(e: any, userImageProperty: string): void {
    const file: File = e.target.files[0];
    const fileName: string = file.name;

    this.ref = this.dialogService.open(ImageSelectComponent, {
      header: 'Select Image',
      modal: true,
      closeOnEscape: true,
      dismissableMask: true,
      width: '30vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      styleClass: 'dialog-with-footer',
      data: {
        Image: file,
        AspectRatio: userImageProperty === 'ProfileImage' ? 3 / 3 :  16 / 9,
      },
    });

    this.ref.onClose
      .pipe(take(1))
      .subscribe({
        next: (croppedImageUrl: string): void => {
          if (croppedImageUrl) {
            this.changeUserImage(
              fileName,
              croppedImageUrl,
              userImageProperty
            );
          }
        }
      });
  }

  public changeUserImage(fileName: string, croppedImageUrl: string, userImageProperty: string): void {
    this.settingsService.getFileFromObjectUrl(fileName, croppedImageUrl)
      .then((croppedImageFile: File | null): void => {
        if (croppedImageFile) {
          this.settingsService.editUserImage(croppedImageFile, userImageProperty)
            .subscribe({
              next: (user): void => {
                console.log('user => ', user);
                this.user = user;
                this.authService.userData$.next(user);
              },
              error: (err): void => {
                console.group('HTTP Error')
                console.log('Something Went Wrong In \'changeUserImage\'');
                console.log(err);
                console.groupEnd();
              }
            })
        }
      });
  }
}
