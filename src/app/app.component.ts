import { LinkSubmitComponent } from './link-submit';
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
  directives: [LinkSubmitComponent, ROUTER_DIRECTIVES],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  playlist: Array<any>;

  constructor(af: AngularFire, private router: Router) {//, sanitizer: DomSanitizationService
    // this.items = af.database.list('/items');
    // this.playlist = [];
    // this.link = sanitizer.bypassSecurityTrustResourceUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/202111840&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true");
  }
    
}