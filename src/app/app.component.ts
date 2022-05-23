import { Component, OnInit, Output } from '@angular/core';
import { StateService } from './state-service/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Output() title = 'Facegular';

  constructor(private stateService: StateService){
    
  }
  ngOnInit(): void {
    
  }
}
