import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class FiltersService {
    public filterModalSpecs = new BehaviorSubject<any>({});

    public currentRoute;
    constructor(private route: ActivatedRoute, private router: Router) {
        this.currentRoute = this.route.snapshot.url.join('').split('?')[0];
    }

    navigateToResults(path, searchQuery) {
        console.log('navigating from filters', path);
        this.router.navigate([path], {queryParams: searchQuery});
    }
}
