import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  uploadedImage1: string | ArrayBuffer | null = null;
  uploadedImage2: string | ArrayBuffer | null = null;
  similarityScore: number | null = null; // Initialize as null
  resultImageUrl: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const dropzone1 = document.getElementById('dropzone1');
    const dropzone2 = document.getElementById('dropzone2');

    [dropzone1, dropzone2].forEach((dropzone, index) => {
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
        this.uploadedImage1 = imageData as string; // Ensure imageData is a string
      } else if (index === 1) {
        this.uploadedImage2 = imageData as string; // Ensure imageData is a string
      }
    };
    reader.readAsDataURL(file);
  }
  
  compareImages(): void {
    if (this.uploadedImage1) {
      this.apiService.compareImages(this.uploadedImage1 as string)
        .subscribe(
          (response: { best_match_url: string, similarity_score: number }) => {
            console.log('Response from server:', response)
            this.resultImageUrl = response.best_match_url;
            this.similarityScore = response.similarity_score;
            console.log('Comparison result image URL:', this.resultImageUrl);
            console.log('Similarity score:', this.similarityScore);
          },
          error => {
            console.error('Error comparing images:', error);
          }
        );
    }
  }
}