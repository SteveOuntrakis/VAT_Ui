import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, Input } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);
  url: any = `http://172.16.112.37:8080/api/`;
  errorMessage!: string;

  getUsers(): Observable<User[]> {
    const userUrl = "customers"
    return this.http.get<User[]>(this.url + userUrl);
  }

  setError(): string {
    return this.errorMessage;
  }

  createUser(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const newUrl = this.url + "customer";
    return this.http.post(newUrl, JSON.stringify(data), { headers: headers , responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error in createUser:', error);
          return throwError(() => new Error(this.handleErrorResponse(error)));
        })
      );
  }

  private handleErrorResponse(error: any): string {
    if (error.status === 400) {
      return 'Bad Request: Please check VAT number';
    } else if (error.status === 409) {
      return 'Conflict: A customer with the same VAT already exists.';
    } else if (error.status === 500) {
      return 'Internal Server Error: Something went wrong on the server.';
    } else {
      return 'An unexpected error occurred.';
    }
  }

  getUserByVat(userVat: String): Observable<User> {
    return this.http.get<User>(this.url + userVat)
      .pipe(
        catchError((error) => {
          console.error(`Error fetching user with ID ${userVat}`, error);
          return throwError(() => `Something went wrong while fetching the user.`);
        })
      )
  }
}
