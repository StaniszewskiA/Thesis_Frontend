import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ImageComparisonResponse } from '../models/response.model'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {
  uploadedImage: string | ArrayBuffer | null = null;
  engine: string | null = "vgg16torch";
  top_n: number = 2;
  //similarityScore: number | null = null; // Initialize as null
  resultImages: string[] = [];

  constructor(
    private apiService: ApiService,
    ) {}

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
            this.resultImages.push(URL.createObjectURL(response));
          })
        )
    }
  }
}