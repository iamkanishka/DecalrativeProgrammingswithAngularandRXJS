import { Component } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngdeclarativeprogramming';
  showLoader$ = this.loaderService.loadingAction$
 
  constructor(private loaderService: LoaderService){}

}
