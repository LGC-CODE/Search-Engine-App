import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HcpService} from '../../services/hcp.service';
import {BackendApiService} from '../../services/backend-api.service';

@Component({
    selector: 'app-address-validation',
    templateUrl: './address-validation.component.html',
    styleUrls: ['./address-validation.component.scss']
})
export class AddressValidationComponent implements OnInit {

    public entries;

    constructor(private hcpService: HcpService, private backendApi: BackendApiService) {
        this.hcpService.currentEntries.subscribe(
            entries => {
                this.entries = entries;
            }
        );
    }

    ngOnInit() {
        console.log(this.entries);
    }

    goBack() {
        this.entries.showNow = 'form';
        this.hcpService.currentEntries.next(this.entries);
    }

    submit() {
        this.backendApi.addHcpReq(this.entries.hcpEntry).subscribe(
            resp => {
                console.log(resp);
            }
        );
        this.entries.showNow = 'confirmation';
        this.hcpService.currentEntries.next(this.entries);
        // this.backendApi.addLocationReq(this.entries.addressEntry).subscribe(
        //     resp => {
        //         console.log(resp);
        //     }
        // );
    }

}
