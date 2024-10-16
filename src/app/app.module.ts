import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { SearchCustomerComponent } from './search-customer/search-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    TableComponent,
    SearchCustomerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,JsonPipe, HttpClientModule,FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
