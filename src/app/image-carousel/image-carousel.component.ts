import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  @Input() resultImages: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.slides[0] = {
      src: this.resultImages[0],
    };
    
    this.slides[1] = {
      src: this.resultImages[1],
    };

    this.slides[2] = {
      src: this.resultImages[2],
    }
  }

  printResultImages(): void {
    setTimeout(() => {
      console.log("Działa");
      console.log(this.resultImages);
    }, 30000);
  }
}
