import { Model } from './model';

export class Car {
    id: number;
    name: string;
    model: Model;
    created: Date;
    registration: Date;
    lastUpdate: Date;
    country: string;
}
