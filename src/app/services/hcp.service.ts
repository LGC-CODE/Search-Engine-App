import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HcpService {
    public currentEntries = new BehaviorSubject<any>({
        showNow: 'form'
    });
    constructor() {}
}
