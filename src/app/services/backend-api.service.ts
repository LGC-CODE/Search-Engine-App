import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {
    private path = '/search-records?search=';

    constructor(private http: HttpClient) {}

    search(filter, page = 1) {
        console.log(filter);
        return this.http.get<any>(environment.apiEndpoint + this.path + encodeURI(filter))
            .pipe(
                map(
                    (response: any) => {
                        console.log(response);
                        return response;
                    }
                )
            );
    }
}

