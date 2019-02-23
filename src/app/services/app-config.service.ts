import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    public menuItems = {
        newSearch: false,
        addHcp: false,
        user: false
    };

    public toggleMenuItems = new BehaviorSubject<any>(this.menuItems);

    constructor() {}
}
