import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

interface StateGroup {
  letter: string;
  names: string[];
}

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  stateForm: FormGroup;

  stateGroups: StateGroup[] = [
    { letter: 'A', names: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan'] },
    { letter: 'B', names: ['Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Botswana', 'Brazil', 'Bulgaria', 'Burkina Faso', 'Burundi'] },
    { letter: 'C', names: ['Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic'] },
    { letter: 'D', names: ['Denmark', 'Djibouti', 'Dominica', 'Dominican Republic'] },
    { letter: 'E', names: ['Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia'] },
    { letter: 'F', names: ['Fiji', 'Finland', 'France'] },
    { letter: 'G', names: ['Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Guinea', 'Guyana'] },
    { letter: 'H', names: ['Haiti', 'Honduras', 'Hungary'] },
    { letter: 'I', names: ['Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy'] },
    { letter: 'J', names: ['Jamaica', 'Japan', 'Jordan'] },
    { letter: 'K', names: ['Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan'] },
    { letter: 'L', names: ['Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg'] },
    { letter: 'M', names: ['Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar'] },
    { letter: 'N', names: ['Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway'] },
    { letter: 'O', names: ['Oman'] },
    { letter: 'P', names: ['Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal'] },
    { letter: 'Q', names: ['Qatar'] },
    { letter: 'R', names: ['Romania', 'Russia', 'Rwanda'] },
    { letter: 'S', names: ['Saint Kitts and Nevis', 'Saint Lucia', 'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Sweden', 'Switzerland', 'Syria'] },
    { letter: 'T', names: ['Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan'] },
    { letter: 'U', names: ['Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan'] },
    { letter: 'V', names: ['Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam'] },
    { letter: 'Y', names: ['Yemen'] },
    { letter: 'Z', names: ['Zambia', 'Zimbabwe'] }
  ];

  stateGroupOptions: Observable<StateGroup[]>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.stateForm = this.fb.group({
      stateGroup: ''
    });
  
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || ''))
    );
  
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
  
    this.secondFormGroup = this.fb.group({
      universityName: ['', Validators.required],
      universityWebsite: ['', Validators.required],
      nationalRanking: ['', Validators.required],
      selectedCountry: ['', Validators.required],
      universityDescription: ['', Validators.required],
      universityType: ['', Validators.required],
      programsOffered: ['', Validators.required],
    });
  
    this.thirdFormGroup = this.fb.group({
      courseName: ['', Validators.required],
      courseDuration: ['', Validators.required],
      courseLevel: ['', Validators.required],
      coursePrice: ['', Validators.required],
      areaOfStudy: ['', Validators.required]
    });
  }  

  private _filterGroup(value: string): StateGroup[] {
    const filterValue = value.toLowerCase();

    return this.stateGroups
      .map(group => ({
        letter: group.letter,
        names: group.names.filter(name => name.toLowerCase().includes(filterValue))
      }))
      .filter(group => group.names.length > 0);
  }

  submitApplication() {
    console.log('Application Submitted:', {
      country: this.firstFormGroup.value.firstCtrl,
      university: this.secondFormGroup.value,
      course: this.thirdFormGroup.value
    });
  }
}
