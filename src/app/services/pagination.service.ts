import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    public paginationPossible = new BehaviorSubject<any>(null);
    public paginationEnabled = new BehaviorSubject<any>(null);

    constructor() {}
}
