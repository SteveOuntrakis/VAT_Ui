import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent {

  private service = inject(CustomerService);
  user!: User;
  vatRequest: string ="";
  router =inject(Router);
  message : string ="initialize";

  loadCustomerByVat() {

    this.service.getUserByVat(this.vatRequest).subscribe({
      next: (response: User) => {
        
        this.message = "";
        this.user = response;
        console.log(this.user);
      },
      error: err => {
        this.message = "Doesn't exist";
        console.error(`Something is wrong... ${err}`);
      },
      complete: () => {
        this.message = "";
        console.log('Data Fetch completed...');
      }
    });
  }

  goTable(){
    this.router.navigate(['table']);
  }

}
