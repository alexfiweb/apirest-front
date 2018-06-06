import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent }      from './cars/cars.component';
import { CarDetailsComponent }      from './car-details/car-details.component';
import { NewCarComponent }      from './new-car/new-car.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/car', pathMatch: 'full' },
  { path: 'car', component: CarsComponent },
  { path: 'detail/:id', component: CarDetailsComponent },
  { path: 'newcar', component: NewCarComponent },
  { path: 'login', component: LoginComponent },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
