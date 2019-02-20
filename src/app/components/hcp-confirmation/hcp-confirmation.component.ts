import {Component, OnInit} from '@angular/core';
import {HcpService} from '../../services/hcp.service';

@Component({
    selector: 'app-hcp-confirmation',
    templateUrl: './hcp-confirmation.component.html',
    styleUrls: ['./hcp-confirmation.component.scss']
})
export class HcpConfirmationComponent implements OnInit {

    public entries;

    constructor(private hcpService: HcpService) {
        this.hcpService.currentEntries.subscribe(
            entries => {
                this.entries = entries;
            }
        );
    }

    ngOnInit() {
    }

}
