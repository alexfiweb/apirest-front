import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../car';
import { Brand } from '../brand';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchObject } from '../searchObject';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[];
  cars$: Observable<Car[]>;
  brands: Brand[];
  searchObject: SearchObject = new SearchObject();

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getBrands();
    this.carService.subscribeTest().subscribe(cars => this.cars = cars);
    this.carService.search(this.searchObject);
  }

  getCars(): void {
    this.cars$ = this.carService.getCars()
  }

  getBrands(): void {
    this.carService.getBrands()
      .subscribe(brands => this.brands = brands);
  }

  delete(car: Car): void {
    this.cars = this.cars.filter(h => h !== car);
    this.carService.deleteHero(car).subscribe();
  }

  search(model, brand) {
    this.searchObject = new SearchObject();
    this.searchObject.model = model;
    this.searchObject.brand = brand;
    this.carService.search(this.searchObject);
  }
}
