import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  private sub: any;
  items: FirebaseListObservable<any>;
  playlist: Subject<any>;
  id: String;

  constructor(private route: ActivatedRoute, private router: Router, af: AngularFire) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.items = af.database.list('/items/' + this.id); 
  }

  ngOnInit() {
  	// this.sub = this.route.params.subscribe(params => {
   //    this.id = params['id'];
   //  })
  }

  fork(id: string) {
    this.router.navigate(['/playlist/', this.id, '/fork']);
  }

}
