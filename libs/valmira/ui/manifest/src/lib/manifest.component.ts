import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vma-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManifestComponent {}
