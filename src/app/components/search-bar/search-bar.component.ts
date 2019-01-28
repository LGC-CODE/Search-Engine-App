import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {switchMap, debounceTime, tap, finalize, startWith, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BackendApiService} from '../../services/backend-api.service';


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

    constructor(private fb: FormBuilder, private backendApi: BackendApiService) {}

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
                    return this.backendApi.search(typeof value === 'string' ? value : value.name, 1)
                    .pipe(
                        finalize(() => this.isLoading = false),
                    );
                }
                )
            )
            .subscribe(users => this.filteredUsers = users);
    }

    displayFn(user) {
        console.log(user);
        if (user) { return user.name; }
    }

    select($e) {
        console.log($e);
    }

}
