import {Component, OnInit} from '@angular/core';
import {FiltersService} from '../../services/filters.service';
import {ActivatedRoute} from '@angular/router';
import {PaginationService} from '../../services/pagination.service';

@Component({
    selector: 'app-pagination-bar',
    templateUrl: './pagination-bar.component.html',
    styleUrls: ['./pagination-bar.component.scss']
})
export class PaginationBarComponent implements OnInit {
    public currentPage;
    public canNextPage;


    constructor(private filterService: FiltersService, private route: ActivatedRoute,
                private paginationService: PaginationService) {
        this.paginationService.paginationPossible.subscribe(
            nextPage => {
                this.canNextPage = nextPage;
            }
        );

        this.currentPage = this.route.snapshot.queryParams.page || 1;
        this.setPage();
    }

    ngOnInit() {
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
        const params = this.route.snapshot.queryParams;
        const searchQuery = {...params, page: this.currentPage, limit: 20};
        this.filterService.navigateToResults('results/list', searchQuery);
    }

}
