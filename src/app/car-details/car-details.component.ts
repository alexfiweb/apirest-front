import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../car';
import { Brand } from '../brand';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Model } from '../Model';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  myform: FormGroup;
  
  car: Car;
  brands: Brand[];
  models: Model[];
  
  //brands : Brand[];
  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
  ) { }

  date: string;

  ngOnInit(): void {
    this.getCar();
    this.getBrands();
    this.getModels();
  }

  getCar(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carService.getCar(id)
      .subscribe(car => {
        this.date = car.registration.toString();
        this.date = this.date.slice(0, -6);
        this.car = car;
      }
      );
  }
  getBrands(): void {
    this.carService.getBrands()
      .subscribe(brands => this.brands = brands);
  }

  getModels(): void {
    this.carService.getModels()
      .subscribe(models => this.models = models);
  }

  save(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.car.registration = new Date(this.date);
    this.carService.updateCar(this.car, id)
      .subscribe(() => this.carService.goBack());
  }

  goBack(): void {
    this.carService.goBack();
  }


}
