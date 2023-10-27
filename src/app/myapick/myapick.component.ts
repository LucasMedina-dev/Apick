import { Component, Input } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-myapick',
  templateUrl: './myapick.component.html',
  styleUrls: ['./myapick.component.scss']
})
export class MyapickComponent {
  faChevronRight = faChevronRight;
  @Input() data: any;
}
