import { Component, OnInit } from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Control, FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES } from '@angular/common';
import {Observable} from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LinkValidator } from '../link-validator';
import { SoundcloudService } from '../soundcloud-service.service';

@Component({
  moduleId: module.id,
  selector: 'create-playlist',
  templateUrl: 'create-playlist.component.html',
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [SoundcloudService]
})

export class CreatePlaylistComponent implements OnInit {

  items: FirebaseListObservable<any>;
  playlist: Array<any>;
  track: Control;
  form: ControlGroup;

  constructor(af: AngularFire, private router: Router, private builder: FormBuilder, private soundcloudService: SoundcloudService, private sanitizer: DomSanitizationService) {
    this.items = af.database.list('/items');
    this.playlist = [];
    this.sanitizer = sanitizer;
  }

  ngOnInit() {
    this.track = new Control('', Validators.compose([Validators.required, LinkValidator.validUrl]));
    this.form = this.builder.group({
      track: this.track
    });
  }

  add(track: string) {
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
  	let newPlaylistRef = this.items.push(this.playlist);
    let playlistID = newPlaylistRef.key;
    this.router.navigate(['/playlist', playlistID]);
  }

}