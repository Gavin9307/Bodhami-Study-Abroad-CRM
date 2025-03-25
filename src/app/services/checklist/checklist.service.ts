import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface ChecklistSetupUiDTO {
  checklistID: number;
  name: string;
  description: string;
  isDeleted: boolean;  
  councellorID: number | null;  
  councellorName: string;
}


@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient,private toastr: ToastrService) { }

  

}
