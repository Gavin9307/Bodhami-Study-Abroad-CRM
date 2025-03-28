import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentActionDialogComponent } from '../student-action-dialog/student-action-dialog.component'; // Corrected the import path

export interface StudentElement {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  pendingApplications: string;
  phoneNumber: string;
  applicationID : string;
}

const ELEMENT_DATA: StudentElement[] = [
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'Active', pendingApplications: '2', phoneNumber: '9876543210', applicationID : '1'},
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', status: 'Inactive', pendingApplications: '1', phoneNumber: '9123456789', applicationID : '2' }
];

@Component({
  selector: 'app-manage-students-application',
  templateUrl: './manage-students-application.component.html',
  styleUrls: ['./manage-students-application.component.css']
})
export class ManageStudentsApplicationComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'status', 'pendingApplications', 'phoneNumber', 'applicationID', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(StudentActionDialogComponent, {
      width: '400px' // You can adjust the dialog width as needed
    });
  }

  ngOnInit() {}
}
