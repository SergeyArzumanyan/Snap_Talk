import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

import { ImageCroppedEvent, ImageCropperModule } from "ngx-image-cropper";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

@Component({
  selector: 'app-image-select',
  standalone: true,
    imports: [
        ImageCropperModule,
        ButtonModule,
        RippleModule
    ],
  templateUrl: './image-select.component.html',
  styleUrl: './image-select.component.scss'
})
export class ImageSelectComponent {
  public ImageFile: File;
  private CroppedImageUrl: SafeUrl;

  public pending: boolean = true;

  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private sanitizer: DomSanitizer,
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
    this.CroppedImageUrl = this.sanitizer
      .bypassSecurityTrustUrl(e.objectUrl)['changingThisBreaksApplicationSecurity'];
  }

  public save(): void {
    this.ref.close(this.CroppedImageUrl);
  }

  public cancel(): void {
    this.ref.close();
  }
}
