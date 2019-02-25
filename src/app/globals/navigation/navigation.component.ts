import {Component, OnInit, Input, HostListener} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupSearchComponent} from '../../components/popup-search/popup-search.component';
import {SearchService} from '../../services/search.service';
import {PopupNewHcpComponent} from '../../components/popup-new-hcp/popup-new-hcp.component';
import {AppConfigService} from '../../services/app-config.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public searchBarActive;
    public hcpActive;
    public smNavBarShow;
    public isCollapsed = true;

    public menuItems;
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        if (event.target.innerWidth < 575) {
            this.smNavBarShow = true;
        } else {
            this.smNavBarShow = false;
        }
    }

    constructor(private modalService: NgbModal, private searchService: SearchService, private appConfigService: AppConfigService) {
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

        this.appConfigService.toggleMenuItems.subscribe(
            menu => {
                this.menuItems = menu;
            }
        );
    }

    ngOnInit() {
        if (window.innerWidth < 575) {
            this.smNavBarShow = true;
        } else {
            this.smNavBarShow = false;
        }
    }

    toggleSearchBar() {
        this.isCollapsed = true;
        this.searchService.isModalOpen.next(true);
        const modalRef = this.modalService.open(PopupSearchComponent, {size: 'xl' as any});
        // modalRef.componentInstance.name = 'World';
    }

    toggleHcp() {
        this.isCollapsed = true;
        this.searchService.isHcpOpen.next(true);
        const modalRef = this.modalService.open(PopupNewHcpComponent, {size: 'xl' as any});
    }

}
