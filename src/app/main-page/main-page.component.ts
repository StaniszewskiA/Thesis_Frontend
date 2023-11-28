import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ApiService } from './api.service';
import { ImageCarouselComponent } from './../image-carousel/image-carousel.component';

@Component({
 selector: 'app-main-page',
 templateUrl: './main-page.component.html',
 styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {
 uploadedImage: string | ArrayBuffer | null = null;
 engineOptions: string[] = [
    "VGG16_TF",
    "V6_TORCH",
    "BIOMETRIC_ENGINE",
    "HASH_CODES",
    "CNNH",
    "DNNH"
 ]

 selectedEngine: string = this.engineOptions[0];
 top_n: number = 3;
 resultImages: string[] = [];

 // Function to select the engine for comparison

 constructor(
    private apiService: ApiService,
    private render: Renderer2,
    private elementRef: ElementRef
    ) {}


  @ViewChild('dropdownMenu') dropdownMenu: ElementRef | undefined;
  @ViewChild(ImageCarouselComponent) imageCarouselComponent!: ImageCarouselComponent;

  // Method to open the dropdown menu
  openDropdownMenu(): void {
    const dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
    this.render.setStyle(dropdownMenu, 'display', 'block');
  }

  closeDropdownMenu(): void {
    const dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
    this.render.setStyle(dropdownMenu, 'display', 'none');
  }

    selectEngine(engine: string): void {
    this.selectedEngine = engine;
    console.log(this.selectedEngine)
  }


 ngOnInit(): void {
    const dropzone1 = document.getElementById('dropzone1');

    // Function to add event listeners to the dropzone
    [dropzone1].forEach((dropzone, index) => {
      dropzone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      dropzone?.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
      });

      dropzone?.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        const file = e.dataTransfer?.files[0];
        if (file) {
          this.handleImageUpload(file, index);
        }
      });
    });
 }

 // Function to handle image upload
 handleImageUpload(file: File, index: number): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result; // This will be the base64 data URI
      if (index === 0) {
        this.uploadedImage = imageData as string; // Ensure imageData is a string
      }
    };
    reader.readAsDataURL(file);
 }

 compareImages(): void {
  if (this.uploadedImage) {
    this.apiService.compareImage(this.uploadedImage as string, this.selectedEngine as string, this.top_n as number)
      .subscribe(
        (response => {
          console.log("Response from compareImage:", response);
          this.handleResponse(response);
        }),
        (error => {
          console.error("Error in compareImage:", error);
        })
      );
  }
}

private handleResponse(response: any): void {
  if (this.resultImages.length > 0) {
    this.resultImages.pop();
  }
  
  response.matches_images.forEach((imageData: string) => {
    const img = new Image();
    img.onload = () => {
      this.resultImages.push(img.src)
    };
    img.src = `data:image/jpeg;base64,${imageData}`;
  }); 
}
}