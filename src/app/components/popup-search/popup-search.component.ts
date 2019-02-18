import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from 'rxjs';
import {SearchService} from '../../services/search.service';

@Component({
    selector: 'app-popup-search',
    templateUrl: './popup-search.component.html',
    styleUrls: ['./popup-search.component.scss']
})
export class PopupSearchComponent implements OnInit {

    constructor(public activeModal: NgbActiveModal, private searchService: SearchService) {}

    ngOnInit() {
    }

    close() {
        this.activeModal.dismiss('Cross click');
        this.searchService.isModalOpen.next(false);
    }

}
