import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCarouselComponent implements OnInit {

  slides: any[] = []
  @Input() resultImages: string[] = [];
  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCarouselData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["resultImages"] && this.resultImages.length > 0) {
      this.loadCarouselData();
      this.cdr.detectChanges(); // Optional: Trigger change detection
    }
  }

  loadCarouselData(): void {
    this.slides = this.resultImages.map((imageUrl, index) => ({
      src: imageUrl,
      title: `Image ${index + 1}`,
    }));
  }

  changeCarouselData(): void {
    this.printImages();

    this.slides = [
      { src: "../../assets/imgs/sddefault.jpg", title: 'Angular', subtitle: 'A TypeScript-based web application framework' },
      { src: "../../assets/imgs/dummy-image.jpg", title: 'React', subtitle: 'A JavaScript library for building user interfaces' },
      { src: "../../assets/imgs/sddefault.jpg", title: 'Vue', subtitle: 'A progressive JavaScript framework for building user interfaces' }
    ];
    this.slides = [...this.slides];
    this.cdr.detectChanges();
  }

  public printImages(): void {
    console.log("Działa");
    console.log(this.resultImages[0]);
    console.log(this.resultImages[1]);
    console.log(this.resultImages[2]);
  }
}
