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
    private geoSpacialPath = '/geolocation';

    constructor(private http: HttpClient) {}

    search(filter, page = 1) {
        console.log(filter);
        return this.http.get<any>(environment.apiEndpoint + this.searchPath + encodeURI(filter))
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

