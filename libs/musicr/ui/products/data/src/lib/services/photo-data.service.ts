import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { Photo } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class PhotoDataService extends ApsDataService<Photo> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Photo', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/photos/`;
    this.entitiesUrl = `/mrlApi/photos`;
  }
}
