import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

    public filterTypes = {
        selectName: '',
        territory: '',
        status: ''
    };

    constructor() {}

    ngOnInit() {
    }

    getNameType(type) {
        console.log(type);
        this.filterTypes.selectName = type;
    }

    getTerritory(type) {
        console.log(type);
        this.filterTypes.territory = type;
    }

    getStatus(type) {
        console.log(type);
        this.filterTypes.status = type;
    }
}
