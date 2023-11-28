import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  @Input() resultImages: string[] = [];
  constructor(
    private cdr: ChangeDetectorRef
  ) {}

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Registered a change");
    if ('resultImages' in changes) {
      this.updateSlides();
      this.cdr.detectChanges();
    }
  }

  private updateSlides(): void {
    this.slides = this.resultImages.map((imageData, index) => {
      return {
        id: index,
        src: `data:image/jpeg;base64,${imageData}`,
        title: `Slide ${index + 1}`,
        subtitle: `Subtitle ${index + 1}`
      };
    });
  }
}
