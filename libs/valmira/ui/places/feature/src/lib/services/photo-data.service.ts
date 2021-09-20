import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { HttpUrlGenerator } from '@ngrx/data';
import { Photo } from '@valmira/domain';

@Injectable({
  providedIn: 'root',
})
export class PhotoDataService extends ApsDataService<Photo> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Photo', http, httpUrlGenerator);
    this.entityUrl = `/vmaApi/photos/`;
    this.entitiesUrl = `/vmaApi/photos`;
  }
}
