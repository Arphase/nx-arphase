import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor(private http: HttpClient) {}

  upload(payload: FileUploadPayload) {
    return this.http.post(`/ivtApi/file_uploads`, payload);
  }
}
