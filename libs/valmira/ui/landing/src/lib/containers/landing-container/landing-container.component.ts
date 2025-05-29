import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlaceCollectionService } from '@valmira/ui/places/data';

@Component({
  selector: 'vma-landing-container',
  templateUrl: './landing-container.component.html',
  styleUrls: ['./landing-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LandingContainerComponent implements OnInit {
  places$ = this.placeCollectionService.entities$;
  constructor(private placeCollectionService: PlaceCollectionService) {}

  ngOnInit(): void {
    this.placeCollectionService.getWithQuery({ onlyActives: String(true) });
  }
}
