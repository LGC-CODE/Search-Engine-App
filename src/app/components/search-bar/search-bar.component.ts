import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {switchMap, debounceTime, tap, finalize, startWith, map} from 'rxjs/operators';
import {BackendApiService} from '../../services/backend-api.service';
import {Router, ActivatedRoute} from '@angular/router';
import {SearchService} from '../../services/search.service';
import {FiltersService} from '../../services/filters.service';


@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

    filteredUsers: Array<any> = [];
    usersForm: FormGroup;
    isLoading = false;
    displayedColumns = ['name', 'last_name', 'address', 'city', 'state'];
    private searchQuery;

    constructor(
        private fb: FormBuilder, private backendApi: BackendApiService, public routers: Router,
        private route: ActivatedRoute, private searchService: SearchService, private filtersService: FiltersService) {}

    ngOnInit() {
        this.usersForm = this.fb.group({
            userInput: null
        });

        const valsChange = this.usersForm
            .get('userInput')
            .valueChanges
            .pipe(
                debounceTime(300),
                tap(() => this.isLoading = true),
                switchMap(value => {
                    this.searchQuery = typeof value === 'string' ? value : value;
                    return this.backendApi.search(this.searchQuery, 1)
                        .pipe(
                            finalize(() => this.isLoading = false),
                        );
                }
                )
            )
            .subscribe(users => this.filteredUsers = users);
    }

    displayFn(user) {
        if (user) { return user.name; }
    }

    searchSelect($event) {
        this.searchService.isModalOpen.next(false);
        this.routers.navigate(['results/list'], {queryParams: {query: this.searchQuery ? this.searchQuery : '', page: 1, limit: 20}});
        this.filtersService.filterModalSpecs.next({});
    }

    optionSelect($event) {
        console.log($event.option.value);
        this.searchService.isModalOpen.next(false);
        this.routers.navigate(['results/list'], {
            queryParams: {query: false && this.searchQuery ? this.searchQuery : $event.option.value.prof_id, page: 1, limit: 20}
        });
        this.filtersService.filterModalSpecs.next({});
    }
}
