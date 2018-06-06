import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../car.service';
import { Brand } from '../brand';
import { Model } from '../model';
import { Car } from '../Car';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  constructor(
    private carService: CarService,
  ) { }

  brands: Brand[];
  model: Model = new Model();
  car: Car = new Car();
  brand: Brand = new Brand();
  models: Model[];

  ngOnInit() {
    //this.getModels();
    this.getBrands();
    this.getModelsByBrand(3);
  }

  getBrands(): void {
    this.carService.getBrands()
      .subscribe(brands => this.brands = brands);
  }

  getModels(): void {
    this.carService.getModels()
      .subscribe(models => this.models = models);
  }

  getModelsByBrand(brand:number): void {
    this.carService.getModelsByBrand(brand)
      .subscribe(models => this.models = models);
  }
  modelString : string[];
  brandString : string[];
  saveCar(model: string, country: string, registration: Date, brand: number): void {
    this.modelString = model.split(',',2);
    this.model.id = parseInt(this.modelString[0]);
    this.model.name = this.modelString[1];
    this.brand.id = brand;
    this.model.brand = this.brand;
    this.car.model = this.model;
    this.car.registration = registration;
    this.car.country = country;
    this.carService.saveCar(this.car)
      .subscribe(() => this.carService.goBack());
  }
  
  console(model: string):void {
    
    this.modelString = model.split(',',2);

    console.log(this.modelString[1]);
  }

  goBack(): void {
    this.carService.goBack();
  }

}
