export class SearchObject {
    brand: string;
    model: string;

    constructor () {
        this.brand = '';
        this.model = '';
    }
    
    isEmpty(): boolean {
        return this.model==='' && this.brand==='';
    }
}