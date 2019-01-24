import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private httpClient: HttpClient) {
        this.httpClient.get(environment.apiEndpoint + '/getName').toPromise().then(
            resp => {
                console.log(resp);
            }
        ).catch(
            err => {
                console.dir(err);
            }
        );
    }
    title = 'app';
}
