import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileUploadModule } from 'ng2-file-upload';

import { EagerFileUploadDirective } from './eager-file-upload.directive';
import { IvtFileUploadComponent } from './file-upload.component';

@NgModule({
  declarations: [IvtFileUploadComponent, EagerFileUploadDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  exports: [IvtFileUploadComponent, EagerFileUploadDirective],
})
export class IvtFileUploadModule {}
