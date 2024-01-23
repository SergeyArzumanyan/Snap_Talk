import { Component } from '@angular/core';

import { ImageCroppedEvent, ImageCropperModule } from "ngx-image-cropper";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-image-select',
  standalone: true,
  imports: [
    ImageCropperModule,
    ButtonModule
  ],
  templateUrl: './image-select.component.html',
  styleUrl: './image-select.component.scss'
})
export class ImageSelectComponent {
  public ImageFile: File;
  private CroppedImageUrl: string;

  public pending: boolean = true;

  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.ImageFile = this.config.data.Image;
  }

  public onLoadStart(): void {
    this.pending = true;
  }

  public imageLoaded(): void {
    this.pending = false;
  }

  public loadImageFailed(): void {
    this.ref.close();
  }

  public imageCropped(e: ImageCroppedEvent): void {
    this.CroppedImageUrl = e.objectUrl;
  }

  public save(): void {
    this.ref.close(this.CroppedImageUrl);
  }

  public cancel(): void {
    this.ref.close();
  }
}
