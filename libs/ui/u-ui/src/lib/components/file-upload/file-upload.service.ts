import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IVT_STATE_CONFIGURATION, IvtStateConfiguration } from '@ivt/u-state';

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
  constructor(private http: HttpClient, @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration) {}

  upload(payload: FileUploadPayload) {
    return this.http.post<any>(`${this.config.apiUrl}/file_uploads`, payload);
  }
}
