import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
apiUrl = 'http://localhost:8000/api/menu'; 

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getMenus(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any[]>(this.apiUrl, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  
  addMenu(menuData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<any>(`${this.apiUrl}`, menuData, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  
  getMenu(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

 
  updateMenu(id: number, menuData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, menuData, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  
  deleteMenu(id: number): Observable<any> {
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
