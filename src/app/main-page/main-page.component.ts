import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {
  uploadedImage: string | ArrayBuffer | null = null;
  engine: string | null = "hash_codes";
  top_n: number = 3;
  //similarityScore: number | null = null; // Initialize as null
  resultImages: string[] = [];

  constructor(
    private apiService: ApiService,
    ) {}

  ngOnInit(): void {
    const dropzone1 = document.getElementById('dropzone1');

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
      this.apiService.compareImage(this.uploadedImage as string, this.engine as string, this.top_n as number)
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