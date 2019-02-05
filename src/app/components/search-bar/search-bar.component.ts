import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {switchMap, debounceTime, tap, finalize, startWith, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BackendApiService} from '../../services/backend-api.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

    filteredUsers: Array<any> = [];
    usersForm: FormGroup;
    isLoading = false;
    displayedColumns = ['name', 'address'];
    private searchQuery;

    constructor(
        private fb: FormBuilder, private backendApi: BackendApiService, public routers: Router,
        private route: ActivatedRoute) {}

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
                    this.searchQuery = typeof value === 'string' ? value : value.name;
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

    optionSelect($e) {
        const selected = $e.option.value;
        this.routers.navigate(['results/list'], {queryParams: {query: this.searchQuery ? this.searchQuery : ''}});
    }
}
