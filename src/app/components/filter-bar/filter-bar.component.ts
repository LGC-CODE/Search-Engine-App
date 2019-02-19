import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-filter-bar',
    templateUrl: './filter-bar.component.html',
    styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
    public sortByText = 'Sort By';
    public openFilter = false;
    public currentRoute: string;

    constructor(private route: ActivatedRoute, private router: Router) {
        this.currentRoute = this.router.url.split('?')[0];
    }

    ngOnInit() {
    }

    sortBy(type: string, label: string) {
        this.sortByText = label;
        this.route.queryParams.subscribe(
            params => {
                // console.log(params, type);
                const searchQuery = {...params, sortby: type};
                // console.log(searchQuery);
                this.router.navigate([this.currentRoute], {queryParams: searchQuery});
            }
        );
    }

    getView(type) {
        this.route.queryParams.subscribe(
            params => {
                // console.log(params, type);
                const searchQuery = {...params};
                // console.log(searchQuery);
                this.router.navigate([`/results/${type}`], {queryParams: searchQuery});
            }
        );
    }

    openFilters() {
        this.openFilter = !this.openFilter;
    }

    getFilterStatus($e) {
        this.openFilter = $e;
    }
}
