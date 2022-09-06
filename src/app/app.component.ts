import { Component, ChangeDetectionStrategy,  } from '@angular/core';
import { tap } from 'rxjs';
import { LoaderService } from './services/loader/loader.service';
import { NotificationService } from './services/Notification/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {
  title = 'ngdeclarativeprogramming';
  showLoader$ = this.loaderService.loadingAction$
  successMessage$ = this.notificationService.successMessageAction$.pipe(
    tap((message) => {
      setTimeout(() => {
        this.notificationService.clearAllMessages();
      }, 5000);
    })
  );
  errorMessage$ = this.notificationService.errorMessageAction$.pipe(
    tap((message) => {
      setTimeout(() => {
        this.notificationService.clearAllMessages();
      }, 5000);
    })
  );

 
  constructor(private loaderService: LoaderService, private notificationService:NotificationService){}

}
