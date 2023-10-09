import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('Django_API_URL/api/upload/', formData)
      .pipe(map(response => response.imageUrl))
  }

  compareImage(imageUrl: string): Observable<Blob> {
    const endpoint = `${this.apiUrl}/api/compare_images/`;
    const payload = { image1_url: imageUrl };
    return this.http.post(endpoint, payload, { responseType: 'blob' });
  }
}