import {Component, OnInit, HostListener} from '@angular/core';
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
    public currentView: string;
    public smFiltersShow;
    public smFiltersToggle;

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        if (event.target.innerWidth < 575) {
            this.smFiltersShow = true;
            this.smFiltersToggle = false; // hide extra filters on mobile
        } else {
            this.smFiltersShow = false;
            this.smFiltersToggle = true;
        }
    }

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        if (window.innerWidth < 575) {
            this.smFiltersShow = true;
            this.smFiltersToggle = false; // hide extra filters on mobile
        } else {
            this.smFiltersShow = false;
            this.smFiltersToggle = true;
        }
    }

    openMore() {
        this.smFiltersToggle = !this.smFiltersToggle;
    }

    sortBy(type: string, label: string) {
        this.currentRoute = this.router.url.split('?')[0];
        console.log('navigating from filter bar', this.currentRoute);
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
        let searchQuery;
        this.currentView = type;
        console.log(type);
        this.route.queryParams.subscribe(
            params => {
                // console.log(params, type);
                searchQuery = {...params};
                // console.log(searchQuery);
            }
        );

        if (searchQuery) {
            this.router.navigate([`results/${type.toLowerCase()}`], {queryParams: searchQuery});
        }
    }

    openFilters() {
        this.openFilter = !this.openFilter;
    }

    getFilterStatus($e) {
        this.openFilter = $e;
    }
}
