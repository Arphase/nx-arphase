import { Observable } from 'rxjs';

export interface MenuItem {
  icon?: string;
  header?: string;
  display$?: Observable<boolean>;
  enabled?: boolean;
  path?: string | string[];
  children?: ChildMenuItem[];
}

export interface ChildMenuItem {
  label?: string;
  enabled?: boolean;
  path?: string[];
}
