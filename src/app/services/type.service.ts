import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
apiUrl = 'http://localhost:8000/api/type'; 

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getTypes(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any[]>(this.apiUrl, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  
  addType(typeData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<any>(`${this.apiUrl}`, typeData, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  
  getType(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

 
  updateType(id: number, typeData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, typeData, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  
  deleteType(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

 
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      
      console.error('An error occurred:', error.error.message);
    } else {
      
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
   return throwError(() => error);
  }
}
