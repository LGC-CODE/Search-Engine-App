import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-address-validation',
    templateUrl: './address-validation.component.html',
    styleUrls: ['./address-validation.component.scss']
})
export class AddressValidationComponent implements OnInit {

    @Input() formStatus;
    @Output() formStatusBack = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {
        console.log(this.formStatus);
    }

    goBack() {
        this.formStatus.status = '';
        this.formStatusBack.next('form');
    }

}
