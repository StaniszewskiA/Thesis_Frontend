import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit {

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  @Input() resultImages: string[] = [];
  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.slides[0] = {
      src: "../../assets/imgs/dummy-image.jpg",
    };
    
    this.slides[1] = {
      src: "../../assets/imgs/sddefault.jpg",
    };

    this.slides[2] = {
      src: "../../assets/imgs/dummy-image.jpg",
    }
  }

  ngOnChange(changes: SimpleChanges): void {
    console.log("DUPSKO 122");
  }

  public printImages(): void {
    console.log("Działa");
    console.log(this.resultImages[0]);
    console.log(this.resultImages[1]);
    console.log(this.resultImages[2]);
  }

  public updateSlides(data: any): void {
    data.matches_images.forEach((imageData: string) => {
      const img = new Image();
      img.onload = () => {
        this.resultImages[0] = img.src;
      };
      img.src = `data:image/jpeg;base64,${imageData}`;
    });
  }
}
