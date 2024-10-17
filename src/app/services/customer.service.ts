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
  url: any = `http://172.16.112.78:8080/api/`;
  errorMessage!: string;

  getUsers(): Observable<User[]> {
    const userUrl = "customers"
    return this.http.get<User[]>(this.url + userUrl);
  }

  setError(): string {
    return this.errorMessage;
  }

  createUser(data: any) {
    console.log("im in service");
    const userUrl = "customer";
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const newUrl = `http://172.16.112.78:8080/api/customer`;
    return this.http.post(newUrl, JSON.stringify(data), { headers: headers });
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
