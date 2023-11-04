import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  compareImage(imageUrl: string, engine: string, top_n: number): Observable<any> {
    const endpoint = `${this.apiUrl}/api/compare_images/`;
    const payload = { 
      image_url: imageUrl, 
      engine: engine,
      top_n: top_n
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    return this.http.post(endpoint, payload, {
      headers,
      observe: 'response'
    }).pipe (
      map((response) => {
        if (response.status === 200) {
          console.log("Success");
          console.log(response.body)
          return response.body;
        } else {
          throw new Error('Request failes with status: ${response.status}');
        }
      })
    )
  }
}