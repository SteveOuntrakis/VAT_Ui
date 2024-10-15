import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'table',
    pathMatch:'full'
  },
  {
    path: 'customer',
    component: CustomerFormComponent
  },
  {
    path: 'table',
    component: TableComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes,{bindToComponentInputs:true})],
  exports:  [RouterModule]
})
export class AppRoutingModule { 
}
