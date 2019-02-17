import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {BackendApiService} from '../../../services/backend-api.service';
import {CircleManager, AgmCircle} from '@agm/core';
import {debounceTime, tap, throttleTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {timer, Observable, fromEvent, BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @ViewChild('circleMap') circleMap: ElementRef;

    private circleChange = new BehaviorSubject<any>({});
    // google maps zoom level
    zoom = 8;

    // initial center position for the map
    public mapDefaults = {
        lat: 37.805769,
        lng: -122
    };

    public refPoint = {
        lat: 37.805769,
        lng: -122,
        radius: 4000
    };

    markers: Array<Marker> = [
        {
            lat: 51.673858,
            lng: 7.815982,
            label: 'A',
            draggable: true
        },
        {
            lat: 51.373858,
            lng: 7.215982,
            label: 'B',
            draggable: false
        },
        {
            lat: 51.723858,
            lng: 7.895982,
            label: 'C',
            draggable: true
        }
    ];

    constructor(private backendApi: BackendApiService) {

        this.circleChange.pipe(
            debounceTime(1000),
            tap(),
            switchMap(value => {
                return this.backendApi.generateGeoSpacial(this.refPoint);
            })
        ).subscribe(
            resp => {
                console.log(resp[0]);
                this.markers = resp[0];
            }
        );

    }

    ngOnInit() {
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    mapClicked($event: any) {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        });
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    centerChanged($e) {
        console.log($e);
        // $e.coords.radius =  this.circleMap;
        console.dir(this.circleMap);
        console.log($e);

        this.refPoint.lat = $e.lat;
        this.refPoint.lng = $e.lng;

        this.circleChange.next(this.refPoint);
    }

    radiusChanged($e) {
        console.log($e);

        this.refPoint.radius = $e;

        this.backendApi.generateGeoSpacial(this.refPoint).subscribe(
            resp => {
                console.log(resp);
                this.markers = resp[0];
            }
        );
    }
}

// just an interface for type safety.
interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
