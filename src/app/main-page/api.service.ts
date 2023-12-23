import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  compareImage(imageUrl: string, engine: string, topN: number): Observable<any> {
    const endpoint = `${this.apiUrl}/api/compare_images/`;
    const payload = { 
      image_url: imageUrl, 
      engine: engine,
      topN: topN
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

          return response.body;
        } else {
          throw new Error('Request failes with status: ${response.status}');
        }
      })
    )
  }
}