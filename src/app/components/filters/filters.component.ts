import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FiltersService} from '../../services/filters.service';
import {SearchService} from '../../services/search.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupSearchComponent} from '../popup-search/popup-search.component';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
    @Output() closeFilter = new EventEmitter();

    hasTerritory: boolean;
    currentRoute: string;

    public filterTypes = {
        selectName: '',
        territory: '',
        status: '',
        locationSpecs: '',
        degree: '',
        specialty: ''
    };

    constructor(private route: ActivatedRoute, private router: Router,
        private filtersService: FiltersService, private modalService: NgbModal, private searchService: SearchService) {
        this.filtersService.filterModalSpecs.subscribe(
            filterSpecs => {
                this.filterTypes = filterSpecs;
            }
        );
    }

    ngOnInit() {
        this.currentRoute = this.router.url.split('?')[0];
    }

    closeFilterModal() {
        this.closeFilter.next(false);
    }

    openSearchModal() {
        this.searchService.isModalOpen.next(true);
        const modalRef = this.modalService.open(PopupSearchComponent, {size: 'lg'});
    }

    getNameType($e, type) {
        console.log(type);
        this.filterTypes.selectName = type;
        this.filtersService.filterModalSpecs.next(this.filterTypes);
        this.validateNameType(type, $e.target.checked);
    }

    getTerritory($e, type) {
        // console.log($e);
        this.filterTypes.territory = type;
        this.filtersService.filterModalSpecs.next(this.filterTypes);
        this.validateTerritory(type, $e.target.checked);
    }

    getStatus($e, type) {
        console.log(type);
        this.filterTypes.status = type;
        this.filtersService.filterModalSpecs.next(this.filterTypes);
        this.validateStatus(type, $e.target.checked);
    }

    getLocationSpecs($e) {
        this.filterTypes.locationSpecs = $e.target.value;
        this.filtersService.filterModalSpecs.next(this.filterTypes);
        console.log($e.target.value);
        this.validateQuery($e.target.value);
    }

    getDegree($e) {
        this.filterTypes.degree = $e.target.value;
        this.filtersService.filterModalSpecs.next(this.filterTypes);
        console.log($e.target.value);
        this.validateQuery($e.target.value);
    }

    getSpecialty($e) {
        this.filterTypes.specialty = $e.target.value;
        this.filtersService.filterModalSpecs.next(this.filterTypes);
        console.log($e.target.value);
        this.validateQuery($e.target.value);
    }

    validateTerritory(type, isChecked) {
        if (isChecked && type === 'territory' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // this.location = position.coords;
                const params = this.route.snapshot.queryParams;
                // console.log(params, type);
                const searchQuery = {...params, lat: position.coords.latitude, lng: position.coords.longitude, radius: 10017};
                // console.log(searchQuery);
                this.navigateToResults(searchQuery);
                console.log(position.coords);
            });
        } else {
            const params = this.route.snapshot.queryParams;
            // console.log(params, type);
            const searchQuery = {...params, lat: null, lng: null, radius: null};
            // console.log(searchQuery);
            this.navigateToResults(searchQuery);
        }
    }

    validateNameType(type, isChecked) {
        if (isChecked) {
            const params = this.route.snapshot.queryParams;
            // console.log(params, type);
            const searchQuery = {...params, sortby: type};
            // console.log(searchQuery);
            this.navigateToResults(searchQuery);
        } else {
            const params = this.route.snapshot.queryParams;
            // console.log(params, type);
            const searchQuery = {...params, sortby: null};
            this.navigateToResults(searchQuery);
        }
    }

    validateStatus(type, isChecked) {
        if (isChecked) {
            const params = this.route.snapshot.queryParams;
            // console.log(params, type);
            const searchQuery = {...params, status: type};
            // console.log(searchQuery);
            this.navigateToResults(searchQuery);
        } else {
            const params = this.route.snapshot.queryParams;
            // console.log(params, type);
            const searchQuery = {...params, status: null};
            this.navigateToResults(searchQuery);
        }
    }

    validateQuery(type) {
        const params = this.route.snapshot.queryParams;
        console.log(params);
        const searchQuery = {...params};
        searchQuery.query = this.handleMultipleQueries(searchQuery.query, type);
        console.log(searchQuery.query);
        this.navigateToResults(searchQuery);
    }

    handleMultipleQueries(query, appendedQuery) {
        const queryParts = query.split(' ');
        if (queryParts.length < 4) {
            return query + ' ' + appendedQuery;
        } else {
            queryParts.pop();
            queryParts.push(appendedQuery);
            return queryParts.join(' ');
        }
    }

    navigateToResults(searchQuery) {
        console.log('navigating');
        this.router.navigate([this.currentRoute], {queryParams: searchQuery});
    }
}
