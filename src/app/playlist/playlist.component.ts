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
  playlist: Array<any>;
  id: String;
  forked: boolean;
  forkedFrom: string;

  constructor(private route: ActivatedRoute, private router: Router, af: AngularFire) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.items = af.database.list('/items/' + this.id);
     this.playlist = [];
    this.items
      .subscribe(tracks=>{
        tracks.forEach(track =>{
          if(track.fork) {
            this.forked = true;
            this.forkedFrom = track.fork.forked_from;
          }
          if(track.track) {
            this.playlist.push({track: track.track});
          }
        })
      })
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
