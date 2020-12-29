import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IVT_UI_STATE_CONFIGURATION, IvtUiStateConfiguration } from '@ivt/u-state';

export interface FileUploadPayload {
  model: string;
  field: string;
  id: number | string;
  /** File's base 64 representation */
  file: string;
}

@Injectable({
  providedIn: 'root',
})
export class IvtFileUploadService {
  constructor(private http: HttpClient, @Inject(IVT_UI_STATE_CONFIGURATION) public config: IvtUiStateConfiguration) {}

  upload(payload: FileUploadPayload) {
    return this.http.post(`${this.config.apiUrl}/file_uploads`, payload);
  }
}
