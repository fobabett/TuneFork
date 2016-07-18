import { PlaylistComponent } from './playlist';
// import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {Store} from '@ngrx/store';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(private router: Router) {
    this.router = router;
  }

  create() {
    this.router.navigate(['/playlist/create']);

  }
    
}