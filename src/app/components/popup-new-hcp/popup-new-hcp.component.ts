import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SearchService} from '../../services/search.service';

@Component({
    selector: 'app-popup-new-hcp',
    templateUrl: './popup-new-hcp.component.html',
    styleUrls: ['./popup-new-hcp.component.scss']
})
export class PopupNewHcpComponent implements OnInit {
    public formSpecs;
    public showNow = 'form';

    constructor(public activeModal: NgbActiveModal, private searchService: SearchService) {}

    ngOnInit() {
        this.searchService.isHcpOpen.subscribe(
            isOpen => {
                if (!isOpen) {
                    this.activeModal.dismiss('Cross click');
                }
            }
        );
    }

    close() {
        this.searchService.isHcpOpen.next(false);
    }

    getFormStatus($e) {
        console.log($e);
        this.formSpecs = $e;
        this.showNow = 'validation';
    }

    goBackToForm($e) {
        this.showNow = $e;
    }
}
