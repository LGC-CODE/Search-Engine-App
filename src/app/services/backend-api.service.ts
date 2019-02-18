import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';
import {switchMap, debounceTime, tap, finalize, startWith, map, throttleTime} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {
    private searchPath = '/search-records?search=';
    private sortByPath = '&sortBy=';
    private resultsPath = '/filters?';
    private geoSpacialPath = '/geolocation';

    constructor(private http: HttpClient, private router: Router) {}

    search(filter, page = 1) {
        // console.log(this.router.routerState.snapshot.url.split('?')[1]);
        console.log(filter);
        const query = typeof filter === 'string' ? filter : filter.query;
        const searchQuery = environment.apiEndpoint + this.searchPath + encodeURI(query) + // handle query
                            (filter.sortby ? this.sortByPath + filter.sortby : ''); // handle sort by
                            console.log(searchQuery);
        // const searchQuery = environment.apiEndpoint + this.path + routerState;
        return this.http.get<any>(searchQuery)
            .pipe(
                map(
                    (response: any) => {
                        console.log(response);
                        return response;
                    }
                )
            );
    }

    generateGeoSpacial(coords) {
        return this.http.get<any>(environment.apiEndpoint + this.geoSpacialPath +
            `?lat=${coords.lat}&lng=${coords.lng}&radius=${coords.radius}`)
            .pipe(
                map(resp => resp)
            );
    }

    generateFilteredResults(query) {
        const routerState = this.router.routerState.snapshot.url.split('?')[1];
        return this.http.get<any>(environment.apiEndpoint + this.resultsPath + routerState)
            .pipe(
                map(resp => resp)
            );
    }
}

