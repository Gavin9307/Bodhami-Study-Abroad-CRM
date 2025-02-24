import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';  // <-- Import ToastrService

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent {
  languageForm: FormGroup;
  isLoading = false; // Loader

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService   // <-- Inject ToastrService
  ) {
    this.languageForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addLanguage() {
    if (this.languageForm.invalid) return;

    this.isLoading = true; // Show Loader

    const payload = {
      name: this.languageForm.value.name,
      deleted: false,
      createdBy: 1,  // Replace with dynamic user ID if needed
      updatedBy: 1
    };

    this.http.post('http://localhost:8080/api/language/insertlanguage', payload)
      .subscribe(
        () => {
          this.toastr.success('Language added successfully!', 'Success'); // <-- Success notification
          this.languageForm.reset();
        },
        (error) => {
          console.error('Error adding language:', error);
          this.toastr.error('Failed to add language', 'Error'); // <-- Error notification
        }
      )
      .add(() => this.isLoading = false); // Hide Loader
  }
}
