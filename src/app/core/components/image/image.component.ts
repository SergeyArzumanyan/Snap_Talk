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
  @Input() imageName: string;
  public imageSrc: string;

  ngOnInit(): void {
    this.imageSrc = environment.ImagesUrl + this.imageName;
  }
}
