import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AssessmentResult } from './results.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private baseUrl = 'http://localhost:8080/assessments';

  constructor(private http: HttpClient) {}

  getAimsQuestions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/aims-questions`);
  }

  getAimsFiveOptions(): Observable<{ value: number; label: string }[]> {
    return this.http.get<{ value: number; label: string }[]>(
      `${this.baseUrl}/aims-five-choices`
    );
  }

  getAimsTwoOptions(): Observable<{ value: number; label: string }[]> {
    return this.http.get<{ value: number; label: string }[]>(
      `${this.baseUrl}/aims-two-choices`
    );
  }

  calculateAimsScore(answers: (number | null)[]): Observable<string> {
    const processedAnswers = answers.map((answer) =>
      answer !== null ? answer : 0
    );

    return this.http
      .post(`${this.baseUrl}/aims-score`, processedAnswers, {
        responseType: 'text',
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage =
            error.error?.message ||
            error.error ||
            'Error calculating AIMS score';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  getUricaQuestions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/urica-questions`);
  }

  getUricaOptions(): Observable<{ value: number; label: string }[]> {
    return this.http.get<{ value: number; label: string }[]>(`${this.baseUrl}/urica-choices`);
  }

  calculateUricaScore(answers: (number | null)[]): Observable<string> {
    const processedAnswers = answers.map((answer) =>
      answer !== null ? answer : 0
    );

    return this.http
      .post(`${this.baseUrl}/urica-score`, processedAnswers, {
        responseType: 'text',
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage =
            error.error?.message ||
            error.error ||
            'Error calculating URICA score';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  saveAimsResult(result: { userId: number; totalScore: number; answers: number[]; dateTaken: string }): Observable<any> {
    const addDateTime = `${result.dateTaken}T00:00:00`;
    
    const aimsResult = {
      userId: result.userId,
      totalScore: result.totalScore,
      dateTaken: addDateTime,
      q1: result.answers[0],
      q2: result.answers[1],
      q3: result.answers[2],
      q4: result.answers[3],
      q5: result.answers[4],
      q6: result.answers[5],
      q7: result.answers[6],
      q8: result.answers[7],
      q9: result.answers[8],
      q10: result.answers[9],
      q11: result.answers[10],
      q12: result.answers[11]
    };

    return this.http.post(`${this.baseUrl}/aims-results`, aimsResult).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage =
          error.error?.message ||
          error.error ||
          'Error saving AIMS results';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  saveUricaResult(result: { userId: number; totalScore: number; answers: number[]; dateTaken: string }): Observable<any> {
    const addDateTime = `${result.dateTaken}T00:00:00`;
    const uricaResult = {
      userId: result.userId,
      totalScore: result.totalScore,
      dateTaken: addDateTime,
      q1: result.answers[0],
      q2: result.answers[1],
      q3: result.answers[2],
      q4: result.answers[3],
      q5: result.answers[4],
      q6: result.answers[5],
      q7: result.answers[6],
      q8: result.answers[7],
      q9: result.answers[8],
      q10: result.answers[9],
      q11: result.answers[10],
      q12: result.answers[11],
      q13: result.answers[12],
      q14: result.answers[13],
      q15: result.answers[14],
      q16: result.answers[15],
      q17: result.answers[16],
      q18: result.answers[17],
      q19: result.answers[18],
      q20: result.answers[19],
      q21: result.answers[20],
      q22: result.answers[21],
      q23: result.answers[22],
      q24: result.answers[23],
      q25: result.answers[24],
      q26: result.answers[25],
      q27: result.answers[26],
      q28: result.answers[27],
      q29: result.answers[28],
      q30: result.answers[29],
      q31: result.answers[30],
      q32: result.answers[31]
    };

    return this.http.post(`${this.baseUrl}/urica-results`, uricaResult).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage =
          error.error?.message ||
          error.error ||
          'Error saving URICA results';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getAimsResults(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/aims-results/${userId}`);
  }

  getUricaResults(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/urica-results/${userId}`);
  }

  getAimsResultsByUser(userId: number): Observable<AssessmentResult[]> {
    return this.http.get<AssessmentResult[]>(`${this.baseUrl}/aims-results/${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || error.error || 'Error fetching AIMS results';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getUricaResultsByUser(userId: number): Observable<AssessmentResult[]> {
    return this.http.get<AssessmentResult[]>(`${this.baseUrl}/urica-results/${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || error.error || 'Error fetching URICA results';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
