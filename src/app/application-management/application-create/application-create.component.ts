import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = true;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
