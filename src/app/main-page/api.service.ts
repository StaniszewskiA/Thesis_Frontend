import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { ImageComparisonResponse } from '../models/response.model'

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

  compareImage(imageUrl: string, engine: string, top_n: number): Observable<Blob> {
    const endpoint = `${this.apiUrl}/api/compare_images/`;
    const payload = { 
      image_url: imageUrl, 
      engine: engine,
      top_n: top_n
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ResponseType': 'blob' 
    });

    return this.http.post(endpoint, payload, { headers, responseType: 'blob' });
  }
}