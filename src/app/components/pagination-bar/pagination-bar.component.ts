import {Component, OnInit, OnDestroy} from '@angular/core';
import {FiltersService} from '../../services/filters.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationService} from '../../services/pagination.service';

@Component({
    selector: 'app-pagination-bar',
    templateUrl: './pagination-bar.component.html',
    styleUrls: ['./pagination-bar.component.scss']
})
export class PaginationBarComponent implements OnInit, OnDestroy {
    public currentPage;
    public canNextPage;


    constructor(private filterService: FiltersService, private route: ActivatedRoute,
                private paginationService: PaginationService, private router: Router) {
        this.paginationService.paginationPossible.subscribe(
            nextPage => {
                this.canNextPage = nextPage;
            }
        );

        this.route.queryParams.subscribe(
            params => {
                this.currentPage = params.page;
            }
        );

        this.currentPage = this.route.snapshot.queryParams.page || 1;
        this.setPage();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        // const activeQuery = this.router.url.split('?')[0];
        // console.log('navigating from pagination destroy', activeQuery);
        // const params = this.route.snapshot.queryParams;
        // const searchQuery = {...params, page: null, limit: null};
        // this.filterService.navigateToResults(activeQuery, searchQuery);
    }

    nextPage() {
        this.currentPage++;
        this.setPage();
    }

    prevPage() {
        if (this.currentPage - 1) {
            this.currentPage--;
            this.setPage();
        }
    }

    setPage() {
        const activeQuery = this.router.url.split('?')[0];
        console.log('navigating from pagination', activeQuery);
        const params = this.route.snapshot.queryParams;
        let searchQuery;
        if (activeQuery === 'results/map') {
            searchQuery = {...params, page: null, limit: null};
        } else {
            searchQuery = {...params, page: this.currentPage, limit: 20, lat: null, lng: null, radius: null};
        }
        this.filterService.navigateToResults(activeQuery, searchQuery);
    }

}
