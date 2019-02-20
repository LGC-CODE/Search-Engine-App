import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SearchService} from '../../services/search.service';
import {HcpService} from '../../services/hcp.service';

@Component({
    selector: 'app-popup-new-hcp',
    templateUrl: './popup-new-hcp.component.html',
    styleUrls: ['./popup-new-hcp.component.scss']
})
export class PopupNewHcpComponent implements OnInit {
    public entries;
    public showNow = 'form';

    constructor(public activeModal: NgbActiveModal, private searchService: SearchService, private hcpService: HcpService) {}

    ngOnInit() {
        this.searchService.isHcpOpen.subscribe(
            isOpen => {
                if (!isOpen) {
                    this.activeModal.dismiss('Cross click');
                }
            }
        );

        this.hcpService.currentEntries.subscribe(
            entries => {
                console.log(entries);
                this.entries = entries;
            }
        );
    }

    close() {
        this.searchService.isHcpOpen.next(false);
    }

    getFormStatus($e) {
    }

    goBackToForm($e) {
        this.showNow = $e;
    }
}
