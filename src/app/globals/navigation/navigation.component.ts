import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupSearchComponent} from '../../components/popup-search/popup-search.component';
import {SearchService} from '../../services/search.service';
import {PopupNewHcpComponent} from '../../components/popup-new-hcp/popup-new-hcp.component';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public searchBarActive;
    public hcpActive;

    constructor(private modalService: NgbModal, private searchService: SearchService) {
        this.searchService.isModalOpen.subscribe(
            isOpen => {
                this.searchBarActive = isOpen;
            }
        );

        this.searchService.isHcpOpen.subscribe(
            isOpen => {
                this.hcpActive = isOpen;
            }
        );
    }

    ngOnInit() {
    }

    toggleSearchBar() {
        this.searchService.isModalOpen.next(true);
        const modalRef = this.modalService.open(PopupSearchComponent, {size: 'lg'});
        // modalRef.componentInstance.name = 'World';
    }

    toggleHcp() {
        this.searchService.isHcpOpen.next(true);
        const modalRef = this.modalService.open(PopupNewHcpComponent, {size: 'lg'});
    }

}
