import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AimsServiceService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAimsQuestions() : Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/aims-questions`);
  }

  calculateAimsScore(answers: (number | null)[]): Observable<string> {
    const processedAnswers = answers.map(answer => answer !== null ? answer : 0);

    return this.http.post(`${this.baseUrl}/aims-score`, processedAnswers, { responseType: 'text' }).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || error.error || "Error calculating AIMS score";
      return throwError(() => new Error(errorMessage));
})
    );
}
}
