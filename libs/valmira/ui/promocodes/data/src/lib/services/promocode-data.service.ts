import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/data';
import { HttpUrlGenerator } from '@ngrx/data';
import { Promocode } from '@valmira/domain';

@Injectable({ providedIn: 'root' })
export class PromocodeDataService extends ApsDataService<Promocode> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
  ) {
    super('Promocode', http, httpUrlGenerator);
    this.entityUrl = `/vmaApi/promocodes/`;
    this.entitiesUrl = `/vmaApi/promocodes`;
  }
}
