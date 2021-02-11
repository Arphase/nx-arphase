import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FileUploadModule } from 'ng2-file-upload';

import { EagerFileUploadDirective } from './eager-file-upload.directive';
import { IvtFileUploadComponent } from './file-upload.component';

@NgModule({
  declarations: [IvtFileUploadComponent, EagerFileUploadDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    NzIconModule,
    MatProgressSpinnerModule,
    NzButtonModule,
    NzGridModule,
  ],
  exports: [IvtFileUploadComponent, EagerFileUploadDirective],
})
export class IvtFileUploadModule {}
