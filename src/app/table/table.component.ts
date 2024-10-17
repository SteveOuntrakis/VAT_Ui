import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  router =inject(Router); 
  service = inject(CustomerService);
  users: User[]= [];
  vatRequest : string ="";
  message : string ="Loading...";
  page : number = 1;

  ngOnInit():void {
    this.service.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
        this.message ="No Users found!"
      },
      error: err => console.error(`Something is wrong... ${err}`),
      complete: () => console.log('Data Fetch completed...')
    });
  }

  prev(){
    this.page--;
  }

  next(){
    this.page++;
  }

  goCustomer(){
    this.router.navigate(['customer']);
  }

  goToSearch(){
    this.router.navigate(['search']);
  }

}