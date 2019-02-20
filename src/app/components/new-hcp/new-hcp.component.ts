import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HcpService} from '../../services/hcp.service';

@Component({
    selector: 'app-new-hcp',
    templateUrl: './new-hcp.component.html',
    styleUrls: ['./new-hcp.component.scss']
})
export class NewHcpComponent implements OnInit {
    private location_id = Math.floor(Math.random() * 10000000000);
    private prof_id = Math.floor(Math.random() * 10000000000);
    private req_id = Math.floor(Math.random() * 10000000000);
    @Output() formStatus = new EventEmitter<any>();

    public hcpEntry = {
        prof_id: this.prof_id,
        status: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        degree: '',
        specialty: '',
        gender: '',
        birthyear: '',
        gradyear: '',
        medschool: '',
        pdrp_optout: '',
        best_loc: this.location_id,
        email: '',
        website: '',
        mobile: '',
        add_reason: '',
        req_id: this.req_id
    };

    public addressEntry = {
        loc_id: this.location_id,
        bldg_id: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip5: '',
        country_code: '',
        add_date: new Date().toLocaleString(),
        last_update_date: new Date().toLocaleString(),
        last_zip5: '',
        last_addr_latitude: '',
        last_addr_longitude: '',
    };

    public entries;

    public stateList = [
        {
            'name': 'Alabama',
            'abbreviation': 'AL'
        },
        {
            'name': 'Alaska',
            'abbreviation': 'AK'
        },
        {
            'name': 'American Samoa',
            'abbreviation': 'AS'
        },
        {
            'name': 'Arizona',
            'abbreviation': 'AZ'
        },
        {
            'name': 'Arkansas',
            'abbreviation': 'AR'
        },
        {
            'name': 'California',
            'abbreviation': 'CA'
        },
        {
            'name': 'Colorado',
            'abbreviation': 'CO'
        },
        {
            'name': 'Connecticut',
            'abbreviation': 'CT'
        },
        {
            'name': 'Delaware',
            'abbreviation': 'DE'
        },
        {
            'name': 'District Of Columbia',
            'abbreviation': 'DC'
        },
        {
            'name': 'Federated States Of Micronesia',
            'abbreviation': 'FM'
        },
        {
            'name': 'Florida',
            'abbreviation': 'FL'
        },
        {
            'name': 'Georgia',
            'abbreviation': 'GA'
        },
        {
            'name': 'Guam Gu',
            'abbreviation': 'GU'
        },
        {
            'name': 'Hawaii',
            'abbreviation': 'HI'
        },
        {
            'name': 'Idaho',
            'abbreviation': 'ID'
        },
        {
            'name': 'Illinois',
            'abbreviation': 'IL'
        },
        {
            'name': 'Indiana',
            'abbreviation': 'IN'
        },
        {
            'name': 'Iowa',
            'abbreviation': 'IA'
        },
        {
            'name': 'Kansas',
            'abbreviation': 'KS'
        },
        {
            'name': 'Kentucky',
            'abbreviation': 'KY'
        },
        {
            'name': 'Louisiana',
            'abbreviation': 'LA'
        },
        {
            'name': 'Maine',
            'abbreviation': 'ME'
        },
        {
            'name': 'Marshall Islands',
            'abbreviation': 'MH'
        },
        {
            'name': 'Maryland',
            'abbreviation': 'MD'
        },
        {
            'name': 'Massachusetts',
            'abbreviation': 'MA'
        },
        {
            'name': 'Michigan',
            'abbreviation': 'MI'
        },
        {
            'name': 'Minnesota',
            'abbreviation': 'MN'
        },
        {
            'name': 'Mississippi',
            'abbreviation': 'MS'
        },
        {
            'name': 'Missouri',
            'abbreviation': 'MO'
        },
        {
            'name': 'Montana',
            'abbreviation': 'MT'
        },
        {
            'name': 'Nebraska',
            'abbreviation': 'NE'
        },
        {
            'name': 'Nevada',
            'abbreviation': 'NV'
        },
        {
            'name': 'New Hampshire',
            'abbreviation': 'NH'
        },
        {
            'name': 'New Jersey',
            'abbreviation': 'NJ'
        },
        {
            'name': 'New Mexico',
            'abbreviation': 'NM'
        },
        {
            'name': 'New York',
            'abbreviation': 'NY'
        },
        {
            'name': 'North Carolina',
            'abbreviation': 'NC'
        },
        {
            'name': 'North Dakota',
            'abbreviation': 'ND'
        },
        {
            'name': 'Northern Mariana Islands',
            'abbreviation': 'MP'
        },
        {
            'name': 'Ohio',
            'abbreviation': 'OH'
        },
        {
            'name': 'Oklahoma',
            'abbreviation': 'OK'
        },
        {
            'name': 'Oregon',
            'abbreviation': 'OR'
        },
        {
            'name': 'Palau',
            'abbreviation': 'PW'
        },
        {
            'name': 'Pennsylvania',
            'abbreviation': 'PA'
        },
        {
            'name': 'Puerto Rico',
            'abbreviation': 'PR'
        },
        {
            'name': 'Rhode Island',
            'abbreviation': 'RI'
        },
        {
            'name': 'South Carolina',
            'abbreviation': 'SC'
        },
        {
            'name': 'South Dakota',
            'abbreviation': 'SD'
        },
        {
            'name': 'Tennessee',
            'abbreviation': 'TN'
        },
        {
            'name': 'Texas',
            'abbreviation': 'TX'
        },
        {
            'name': 'Utah',
            'abbreviation': 'UT'
        },
        {
            'name': 'Vermont',
            'abbreviation': 'VT'
        },
        {
            'name': 'Virgin Islands',
            'abbreviation': 'VI'
        },
        {
            'name': 'Virginia',
            'abbreviation': 'VA'
        },
        {
            'name': 'Washington',
            'abbreviation': 'WA'
        },
        {
            'name': 'West Virginia',
            'abbreviation': 'WV'
        },
        {
            'name': 'Wisconsin',
            'abbreviation': 'WI'
        },
        {
            'name': 'Wyoming',
            'abbreviation': 'WY'
        }
    ];

    constructor(private hcpService: HcpService) {
        this.hcpService.currentEntries.subscribe(
            entries => {
                console.log(entries);
                if (entries.addressEntry || entries.hcpEntry) {
                    this.entries = entries;
                    this.addressEntry = this.entries.addressEntry;
                    this.hcpEntry = this.entries.hcpEntry;
                }
            }
        );
    }

    ngOnInit() {
        console.log(this.hcpEntry.suffix);
    }

    getSuffix(type) {
        console.log(type);
        this.hcpEntry.suffix = type;
    }

    getReason(type) {
        console.log(type);
        this.hcpEntry.add_reason = type;
    }

    getDegree(type) {
        console.log(type);
        this.hcpEntry.degree = type;
    }

    getSpecialty(type) {
        console.log(type);
        this.hcpEntry.specialty = type;
    }

    getState(type) {
        console.log(type);
        this.addressEntry.state = type;
    }

    submit() {
        console.log(this.addressEntry);
        console.log(this.hcpEntry);

        this.entries = {
            hcpEntry: this.hcpEntry,
            addressEntry: this.addressEntry,
            status: 'complete',
            showNow: 'validation'
        };

        this.hcpService.currentEntries.next(this.entries);
    }

}
