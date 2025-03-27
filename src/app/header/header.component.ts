import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileActionComponent } from '../Profile-action/profile-action/profile-action.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) {}  

  ngOnInit() {}



  openProfileMenu(event: MouseEvent): void {  
    this.dialog.open(ProfileActionComponent, {
      position: { 
        top: `${event.clientY + 40}px`,  
        left: `${event.clientX - 300}px` 
      }, 
      width : '568px' , 
      height : '600px',
      panelClass: 'custom-dialog'
    });
}

}
