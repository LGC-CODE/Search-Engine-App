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

    constructor(private route: ActivatedRoute, private backendApi: BackendApiService) {}

    ngOnInit() {
        // this.route.queryParams
        //     .subscribe(
        //         params => {
        //             console.log(params);
        //             this.backendApi.search(params.address.split(', ')[1], 1).subscribe(
        //                 results => {
        //                     this.searchResults = results;
        //                     console.log(this.searchResults);
        //                 }
        //             );
        //         }
        //     );
        const valsChange = this.route.queryParams
            .pipe(
                debounceTime(300),
                tap(() => this.isLoading = true),
                switchMap(value => {
                    console.log(value);
                    return this.backendApi.search(typeof value === 'string' ? value : value.query, 1)
                        .pipe(
                            finalize(() => this.isLoading = false),
                        );
                }
                )
            )
            .subscribe(users => this.searchResults = users);
    }

}
