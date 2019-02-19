import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendApiService} from '../../../services/backend-api.service';
import {debounceTime, tap, switchMap, finalize} from 'rxjs/operators';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    searchResults: object;
    isLoading;
    openFilter;

    constructor(private route: ActivatedRoute, private backendApi: BackendApiService) {}

    ngOnInit() {
        // const valsChange = this.route.queryParams
        //     .pipe(
        //         debounceTime(300),
        //         tap(() => this.isLoading = true),
        //         switchMap(value => {
        //             console.log(value);
        //             return this.backendApi.search(value, 1)
        //                 .pipe(
        //                     finalize(() => this.isLoading = false),
        //                 );
        //         }
        //         )
        //     )
        //     .subscribe(users => this.searchResults = users[0]);

        this.applyFilters();
    }

    applyFilters() {
        this.route.queryParams.subscribe(
            params => {
                    console.log(params);
                    this.backendApi.generateFilteredResults('').toPromise().then(
                        resp => {
                            console.log(resp);
                            this.searchResults = resp[0];
                        }
                    );
            }
        );
    }

}
