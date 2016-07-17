import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'forked-playlist',
  templateUrl: 'forked-playlist.html'
})
export class ForkedPlaylistComponent implements OnInit {
  private sub: any;
  forkedItems: FirebaseListObservable<any>;
  id: String;
  items: FirebaseListObservable<any>;
  playlist: Array<any>;
  forked: boolean;

  constructor(private route: ActivatedRoute, private router: Router, af: AngularFire) {
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.forkedItems = af.database.list('/items/' + this.id);
    this.items = af.database.list('/items');
    this.playlist = [];

    this.forkedItems
      .subscribe(tracks=>{
        tracks.forEach(track =>{
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

  upload(track: string) {
    this.playlist.push({track: track});
  }

  share() {
    this.playlist.push({
      fork: {
        forked_from: this.id
      }
    });
    let newPlaylistRef = this.items.push(this.playlist);
    let playlistID = newPlaylistRef.key;
    this.router.navigate(['/playlist', playlistID]);
  }

}
