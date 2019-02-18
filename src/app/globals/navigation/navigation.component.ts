import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupSearchComponent} from '../../components/popup-search/popup-search.component';
import {SearchService} from '../../services/search.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public searchBarActive;

    constructor(private modalService: NgbModal, private searchService: SearchService) {
        this.searchService.isModalOpen.subscribe(
            isOpen => {
                this.searchBarActive = isOpen;
            }
        );
    }

    ngOnInit() {
    }

    toggleSearchBar() {
        this.searchService.isModalOpen.next(true);
        const modalRef = this.modalService.open(PopupSearchComponent, {size: 'lg'});
        modalRef.componentInstance.name = 'World';
    }

}
