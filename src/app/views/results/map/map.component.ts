import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {BackendApiService} from '../../../services/backend-api.service';
import {CircleManager, AgmCircle, GoogleMapsAPIWrapper} from '@agm/core';
import {debounceTime, tap, throttleTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {timer, Observable, fromEvent, BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @ViewChild('circleMap') circleMap: ElementRef;

    private circleChange = new BehaviorSubject<any>({});
    public generatePointsOnMove = false;
    // google maps zoom level
    zoom = 8;

    public iconUrlPath = '/assets/maps/marker.png';

    public styles = [
        {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'simplified'
                },
                {
                    'hue': '#e9ebed'
                },
                {
                    'saturation': -78
                },
                {
                    'lightness': 67
                }
            ]
        },
        {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'simplified'
                },
                {
                    'hue': '#ffffff'
                },
                {
                    'saturation': -100
                },
                {
                    'lightness': 100
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [
                {
                    'visibility': 'simplified'
                },
                {
                    'hue': '#bbc0c4'
                },
                {
                    'saturation': -93
                },
                {
                    'lightness': 31
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                },
                {
                    'hue': '#ffffff'
                },
                {
                    'saturation': -100
                },
                {
                    'lightness': 100
                }
            ]
        },
        {
            'featureType': 'road.local',
            'elementType': 'geometry',
            'stylers': [
                {
                    'visibility': 'simplified'
                },
                {
                    'hue': '#e9ebed'
                },
                {
                    'saturation': -90
                },
                {
                    'lightness': -8
                }
            ]
        },
        {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                },
                {
                    'hue': '#e9ebed'
                },
                {
                    'saturation': 10
                },
                {
                    'lightness': 69
                }
            ]
        },
        {
            'featureType': 'administrative.locality',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                },
                {
                    'hue': '#2c2e33'
                },
                {
                    'saturation': 7
                },
                {
                    'lightness': 19
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'labels',
            'stylers': [
                {
                    'visibility': 'on'
                },
                {
                    'hue': '#bbc0c4'
                },
                {
                    'saturation': -93
                },
                {
                    'lightness': 31
                }
            ]
        },
        {
            'featureType': 'road.arterial',
            'elementType': 'labels',
            'stylers': [
                {
                    'visibility': 'simplified'
                },
                {
                    'hue': '#bbc0c4'
                },
                {
                    'saturation': -93
                },
                {
                    'lightness': -2
                }
            ]
        }
    ];

    // initial center position for the map
    public mapDefaults = {
        lat: 37.805769,
        lng: -122
    };

    public refPoint = {
        lat: 37.805769,
        lng: -122,
        radius: 10017
    };

    markers: Array<Marker> = [
    ];

    constructor(private backendApi: BackendApiService,
        private mapsApiWrapper: GoogleMapsAPIWrapper, private circleManager: CircleManager,
        private route: ActivatedRoute) {

        this.circleChange.pipe(
            debounceTime(1000),
            tap(),
            switchMap(value => {
                return this.backendApi.generateGeoSpacial(this.refPoint);
            })
        ).subscribe(
            resp => {
                console.log(resp[0]);
                if (this.generatePointsOnMove) {
                    this.markers = resp[0];
                }
            }
        );

    }

    ngOnInit() {
        this.applyFilters();
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

    applyFilters() {
        this.route.queryParams.subscribe(
            params => {
                if (!this.generatePointsOnMove) {
                    console.log(params);
                    this.backendApi.generateFilteredResults('').toPromise().then(
                        resp => {
                            console.log(resp[0]);
                            this.markers = resp[0];
                        }
                    );
                }
            }
        );
    }

    centerChanged($e) {
        if (this.generatePointsOnMove) {
            console.log($e);

            this.refPoint.lat = $e.lat;
            this.refPoint.lng = $e.lng;

            this.circleChange.next(this.refPoint);
        }
    }

    radiusChanged($e) {
        console.log($e);

        // this.refPoint.radius = $e;

        // this.backendApi.generateGeoSpacial(this.refPoint).subscribe(
        //     resp => {
        //         console.log(resp);
        //         this.markers = resp[0];
        //     }
        // );
    }

    togglePointGeneration($event) {
        this.generatePointsOnMove = $event.target.checked;
    }

    parseNumber(num) {
        return parseInt(num, 10);
    }
}

// just an interface for type safety.
interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
