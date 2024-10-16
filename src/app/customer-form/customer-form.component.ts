import { Component, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  createUserForm!: FormGroup;
  private fb = inject(FormBuilder);
  service = inject(CustomerService);
  viewMessage :string ='';  
  errorMessage:string ='';

  router =inject(Router); 

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstName: ['',[Validators.required , Validators.maxLength(30)]],
      lastName: ['',[Validators.required, Validators.maxLength(50)]],
      vat: ['',[Validators.required, Validators.maxLength(20)]],
      email: ['',[Validators.required, Validators.maxLength(80), Validators.email]],
      mobilePhone: ['',[Validators.minLength(10), Validators.maxLength(20), Validators.pattern("^[0-9+()]+$")]]
    });
  }

  createUser(){
    if (this.createUserForm.valid) {
      this.service.createUser(this.createUserForm.value).subscribe({
        next: () => {
          this.errorMessage='';
          this.viewMessage =`The Customer has been successfully created.`;
          console.log("The Customer has been successfully created.");
         
        },
        error: err => {
          this.viewMessage= '';
          this.errorMessage= this.service.setError();
          
        }
          ,
        complete: () => console.log('Customer creation complete.')
      });
    };
  }

  get firstName(){
    return this.createUserForm.get('firstName');
  }

  get lastName(){
    return this.createUserForm.get('lastName');
  }

  get vat(){
    return this.createUserForm.get('vat');
  }

  get email(){
    return this.createUserForm.get('email');
  }

  get mobilePhone(){
    return this.createUserForm.get('mobilePhone');
  }

  goTable(){
    this.router.navigate(['table']);
  }
}
