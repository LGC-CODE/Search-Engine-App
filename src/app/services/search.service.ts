import { Injectable } from '@angular/core';
import {SearchConfig} from '../classes/search-config';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    private searchConfig: BehaviorSubject<SearchConfig>;

  constructor() { }
}
