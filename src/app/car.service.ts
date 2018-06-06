import { Injectable } from '@angular/core';
import { Car } from './Car';
import { Brand } from './brand';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchObject } from './searchObject';
import { Model } from './Model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FsZXhmaXdlYi5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWFmMDc0NDc5MjA4YjgwNThhNGFkZDJjIiwiYXVkIjoielpCRTZ6VUkyclY3aUJoenJIeUk1TmFpYUtwdEZJVmYiLCJpYXQiOjE1MjU4NjE3NTgsImV4cCI6bnVsbH0.m8IHg23QDG3W3tJ1iLgknz8fx93kdexoT15MbhNpFE8' })
};

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private http: HttpClient,
    private location: Location
  ) { }

  private carUrl = 'http://localhost:8080/bmw/cars';
  private brandUrl = 'http://localhost:8080/bmw/cars/brands';
  private modelUrl = 'http://localhost:8080/bmw/cars/models';
  private searchTerms = new Subject<SearchObject>();

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carUrl, httpOptions);
    // .pipe(
    //   tap(heroes => this.log(`fetched heroes`)),
    //   catchError(this.handleError('getHeroes', []))
    // );
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.brandUrl, httpOptions);
  }

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.modelUrl, httpOptions);
  }

  getModelsByBrand(brand: number): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.modelUrl}?brand=${brand}`, httpOptions);
  }

  getCar(id: number): Observable<Car> {
    const url = `${this.carUrl}/${id}`;
    return this.http.get<Car>(url, httpOptions);
    // .pipe(
    //   tap(_ => this.log(`fetched hero id=${id}`)),
    //   catchError(this.handleError<Hero>(`getHero id=${id}`))
    // );
  }

  deleteHero(car: Car | number): Observable<Car> {
    const id = typeof car === 'number' ? car : car.id;
    const url = `${this.carUrl}/${id}`;

    return this.http.delete<Car>(url, httpOptions);
    // .pipe(
    //   tap(_ => this.log(`deleted hero id=${id}`)),
    //   catchError(this.handleError<Hero>('deleteHero'))
    // );
  }

  updateCar(car: Car, id: number): Observable<any> {
    const url = `${this.carUrl}/${id}`;
    return this.http.put(url, car, httpOptions);
    // .pipe(
    //   tap(_ => this.log(`updated hero id=${hero.id}`)),
    //   catchError(this.handleError<any>('updateHero'))
    // );
  }

  saveCar(car: Car): Observable<any> {
    const url = `${this.carUrl}`;
    return this.http.post(url, car, httpOptions);
  }

  searchCars(searchObject: SearchObject): Observable<Car[]> {
    if (searchObject.isEmpty()) {
      return this.http.get<Car[]>(this.carUrl, httpOptions);
    }
    return this.http.get<Car[]>(`${this.carUrl}/test?brand=${searchObject.brand}&model=${searchObject.model}`, httpOptions);
  }

  subscribeTest(): Observable<Car[]> {
    return this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((searchObject: SearchObject) => this.searchCars(searchObject)),
    ); 
  }

  search(searchObject: SearchObject) {
    this.searchTerms.next(searchObject);
  }

  goBack(): void {
    this.location.back();
  }
}
