import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FiltersService {
    public filterModalSpecs = new BehaviorSubject<any>({});
    constructor() {}
}
