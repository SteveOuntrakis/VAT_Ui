import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, Input } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);
  url :any=`http://172.16.111.95:8080/api/`;
  errorMessage!:string;


  getUsers(){
    const userUrl ="customers"
    return this.http.get(this.url + userUrl);
  }
  setError():string{
    return this.errorMessage;
  }
  createUser(data: any){
    const userUrl ="customer"
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.url + userUrl, JSON.stringify(data), {headers: headers})
      .pipe(
        retry(1),
        catchError(error => throwError(() =>{

          if (error.status === 400 && error.error.msg){
            this.errorMessage=error.error.msg;
          }
        } ))
      )
  }


  getUserByVat(userVat: String) {
    return this.http.get(this.url + userVat)
      .pipe(
        retry(1),
        catchError((error) => {
          console.error(`Error fetching user with ID ${userVat}`, error);
          return throwError(() => `Something went wrong while fetching the user.`);
        })
      )
  }
}
