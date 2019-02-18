import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';
import {switchMap, debounceTime, tap, finalize, startWith, map, throttleTime} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {
    private searchPath = '/search-records?search=';
    private sortByPath = '&sortBy=';
    private geoSpacialPath = '/geolocation';

    constructor(private http: HttpClient) {}

    search(filter, page = 1) {
        console.log(filter);
        const query = typeof filter === 'string' ? filter : filter.query;
        const searchQuery = environment.apiEndpoint +
                            this.searchPath + encodeURI(query) +
                            (filter.sortby ? this.sortByPath + filter.sortby : '');
                            console.log(searchQuery);
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
}

