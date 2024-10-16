import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  router =inject(Router);
  goCustomer(){
    this.router.navigate(['customer']);
  }
  goToSearch(){
    this.router.navigate(['search']);
  }

  service = inject(CustomerService);
  users: any= [];
  vatRequest : string ="";

  ngOnInit():void {
    this.service.getUsers().subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: err => console.error(`Something is wrong... ${err}`),
      complete: () => console.log('Data Fetch completed...')
    });
  }

}