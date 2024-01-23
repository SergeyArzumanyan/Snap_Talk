import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass } from "@angular/common";

import { environment } from "@env/environment";

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
    <div class="image-wrapper relative">
      @if (!isImageLoaded) {
        <div class="image-loader-overlay anm-spinner absolute flex justify-content-center align-items-center"
             [class]="loaderClassName">
          <i class="ri-loader-4-fill opacity-100"></i>
        </div>
      }

      <img [src]="envImagesUrl + imageName"
           [alt]="imageName"
           [class]="className"
           [ngClass]="{'opacity-70': !isImageLoaded}"
           loading="lazy"
           role="presentation"
           (load)="onImageLoad()" />
    </div>
  `,
  styles: [`
    .image-wrapper {
      .image-loader-overlay {
        width: 100%;
        height: 100%;
        background-color: transparent;
      }
    }
  `]
})
export class ImageComponent implements OnChanges {
  @Input({required: true}) imageName: string;
  @Input() className: string;
  @Input() loaderClassName: string;

  public envImagesUrl: string = environment.ImagesUrl;

  public isImageLoaded: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onImageChangeEnableLoading(changes);
  }

  public onImageLoad(): void {
    this.isImageLoaded = true;
  }

  public onImageChangeEnableLoading(changes: SimpleChanges): void {
    if (changes['imageName'] && !changes['imageName'].firstChange) {
      this.isImageLoaded = false;
    }
  }
}
