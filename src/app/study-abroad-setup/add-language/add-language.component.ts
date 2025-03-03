import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';  // <-- Import ToastrService
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent {
  languageForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {
    this.languageForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addLanguage() {
    if (this.languageForm.invalid) return;

    this.isLoading = true;

    const name = this.languageForm.value.name;
    const createdBy = 1;  
    const updatedBy = 1;

    this.languageService.addLanguage(name, createdBy, updatedBy).subscribe(
      () => {
        this.languageForm.reset();
      },
      (error) => {
        console.error('Error adding language:', error);
      }
    ).add(() => this.isLoading = false);
  }
}