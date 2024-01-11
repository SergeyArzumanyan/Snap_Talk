import { Component, Input, OnInit } from '@angular/core';
import { environment } from "@env/environment";

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent implements OnInit {
  @Input({required: true}) imageName: string;
  @Input() className: string;

  public imageSrc: string;

  ngOnInit(): void {
    this.imageSrc = environment.ImagesUrl + this.imageName;
  }
}
