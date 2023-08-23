import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('Django_API_URL/api/upload/', formData);
  }

  compareImages(image1Url: string, image2Url: string): Observable<any> {
    const endpoint = `${this.apiUrl}/api/compare_images/`;
    const payload = { image1_url: image1Url, image2_url: image2Url };
    return this.http.post<any>(endpoint, payload);
  }
}