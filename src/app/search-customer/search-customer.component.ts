import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit{

  private service = inject(CustomerService);
  user: any;
  vatRequest : string ="";
  router =inject(Router);
  

  ngOnInit() {
    this.loadCustomerByVat(); 
  }

  loadCustomerByVat() {
    this.service.getUserByVat(this.vatRequest).subscribe({
      next: (response: any) => {
        this.user = response;
      },
      error: err => console.error(`Something is wrong... ${err}`),
      complete: () => console.log('Data Fetch completed...')
    });
  }

  goTable(){
    this.router.navigate(['table']);
  }

}
