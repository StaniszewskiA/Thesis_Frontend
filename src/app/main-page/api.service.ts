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

  compareImages(image1Url: string): Observable<{ best_match_url: string, similarity_score: number }> {
    const endpoint = `${this.apiUrl}/api/compare_images/`;
    const payload = { image1_url: image1Url };
    return this.http.post<{ best_match_url: string, similarity_score: number }>(endpoint, payload, { responseType: 'json' }).pipe(
      map(response => ({
        best_match_url: response.best_match_url,
        similarity_score: response.similarity_score
      }))
    );
  }
}