import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface LanguageElement {
  id: number;
  name: string;
  createdBy: number;
  updatedBy: number;
  createdAt: number;
  updatedAt: number;
  deleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient,private toastr: ToastrService) { }
  
  getLanguages(): Observable<LanguageElement[]> {
    return this.http.get<LanguageElement[]>(`${this.baseUrl}/language/getAllLanguages`);
  }

  toggleDeleteStatus(id: number, isDeleted: boolean): Observable<any> {
    const url = isDeleted
      ? `${this.baseUrl}/language/recoverLanguage/${id}`
      : `${this.baseUrl}/language/deleteLanguage/${id}`;
  
    return this.http.put(url, {}, { responseType: 'text' });
  }

  showSuccessMessage(message: string) {
    this.toastr.success(message, 'Success');
  }

  showErrorMessage(message: string) {
    this.toastr.error(message, 'Error');
  }

  addLanguage(name: string, createdBy: number, updatedBy: number): Observable<any> {
    const payload = {
      name: name,
      deleted: false,
      createdBy: createdBy,
      updatedBy: updatedBy
    };

    return new Observable(observer => {
      this.http.post(`${this.baseUrl}/language/insertlanguage`, payload).subscribe(
        (response) => {
          this.toastr.success('Language added successfully!', 'Success');
          observer.next(response);
          observer.complete();
        },
        (error) => {
          this.toastr.error('Failed to add language', 'Error');
          observer.error(error);
        }
      );
    });

    
  }
}
