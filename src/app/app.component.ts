import { Component, ViewContainerRef } from '@angular/core';
import { ComponentsHelper } from 'ng2-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(componentsHelper: ComponentsHelper, viewContainerRef: ViewContainerRef) {
    componentsHelper.setRootViewContainerRef(viewContainerRef);
  }
}
