import {Injectable} from '@angular/core';
import {SearchConfig} from '../classes/search-config';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    public isModalOpen = new BehaviorSubject<any>(false);

    constructor() {}
}
