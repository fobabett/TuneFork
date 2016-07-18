import { Component, OnInit } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Control, FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES } from '@angular/common';
import { LinkValidator } from '../link-validator';

@Component({
  moduleId: module.id,
  selector: 'forked-playlist',
  templateUrl: 'forked-playlist.html',
  directives: [FORM_DIRECTIVES]
})

export class ForkedPlaylistComponent implements OnInit {

  private sub: any;
  forkedItems: FirebaseListObservable<any>;
  id: String;
  items: FirebaseListObservable<any>;
  playlist: Array<any>;
  forked: boolean;
  track: Control;
  form: ControlGroup;

  constructor(private route: ActivatedRoute, private router: Router, af: AngularFire, private builder: FormBuilder, private sanitizer: DomSanitizationService) {
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.sanitizer = sanitizer;
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
  	this.track = new Control('', Validators.compose([Validators.required, LinkValidator.validUrl]));
    this.form = this.builder.group({
      track: this.track
    });
  }

  upload(track: string) {
    // IF SOUNDCLOUD
    // this.soundcloudService
    //   .getPlayer(track)
    //   .then(res => {
    //     console.log(res);
    //     // this api route triggers a redirect. data comes from that call. not sure how to get
    //   })
    // IF YOUTUBE
    if(track.substring(0, 17) == 'https://www.youtu') {
      let urlID = track.split('v=')[1];
      track = 'https://www.youtube.com/embed/' + urlID;
      this.playlist.push({track: track});
    }
    if(track.substring(0, 12) == 'https://open') {
      let urlID = track.split('/track/')[1];
      track = 'https://embed.spotify.com/?uri=spotify%3Atrack%3A' + urlID;
      this.playlist.push({track: track});
    }
  }

  saniziteUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
