import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
apiUrl = 'http://localhost:8000/api/categorie'; 

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getCategories(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any[]>(this.apiUrl, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  
  addCategory(categoryData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<any>(`${this.apiUrl}`, categoryData, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  
  getCategory(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

 
  updateCategory(id: number, categoryData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, categoryData, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  
  deleteCategory(id: number): Observable<any> {
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
