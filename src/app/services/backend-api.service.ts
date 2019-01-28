import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {

    constructor(private http: HttpClient) {}

    search(filter, page = 1) {
        // console.log(filter);
        return this.http.get<any>('/assets/config/hcps.json')
            .pipe(
                map(
                    (response: any) => {
                        // console.log(response); // Not filtering in the server since in-memory-web-api has somewhat restricted api

                        const lowerCaseSearch: string = filter.toLowerCase();

                        const searchQuery = _.filter(response, (object) => {
                            const pickedProps = _.pick(object, 'name', 'address');
                            const foundProps = _.find(pickedProps, e => {
                                // console.log(e.toLowerCase(), lowerCaseSearch);
                                const regexpSearch = new RegExp(`${lowerCaseSearch}`, 'gi');
                                return regexpSearch.test(e.toLowerCase());
                            });
                            // console.log(pickedProps, foundProps);
                            return foundProps;
                        });

                        // console.log(searchQuery);
                        // console.log(response);
                        return searchQuery;
                    }
                )
            );
    }
}

