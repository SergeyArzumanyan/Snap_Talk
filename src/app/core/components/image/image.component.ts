import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass } from "@angular/common";

import { SkeletonModule } from "primeng/skeleton";

import { environment } from "@env/environment";

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    NgClass,
    SkeletonModule,
  ],
  template: `
    <div class="image-wrapper relative">
      @if (!isImageLoaded) {
        <div class="image-loader-overlay absolute flex justify-content-center align-items-center"
             [class]="loaderClassName">
          <p-skeleton [shape]="skeletonShape"
                      [size]="skeletonSize"
                      [width]="skeletonWidth"
                      [height]="skeletonHeight" />
        </div>
      }

      <img [src]="imageName ?
              envImagesUrl + imageName :
             '/assets/images/default-avatar.jpg'"
           [alt]="imageName"
           [class]="className"
           loading="lazy"
           role="presentation"
           (load)="onImageLoad()" />
    </div>
  `,
  styles: `
    .image-wrapper {
      user-select: none;

      .image-loader-overlay {
        width: 100%;
        height: 100%;
        background-color: transparent;
      }
    }
  `
})
export class ImageComponent implements OnChanges {
  @Input({required: true}) imageName: string;

  @Input() skeletonShape: string = '';  // Empty String = Rectangle
  @Input() skeletonSize: string;
  @Input() skeletonWidth: string;
  @Input() skeletonHeight: string;

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
