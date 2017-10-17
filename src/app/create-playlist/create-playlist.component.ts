import { Component, OnInit, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { LinkValidator } from '../link-validator';
import { SoundcloudService } from '../soundcloud.service';
import { SpotifyService } from '../spotify.service';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Item { name: string; }

@Component({
  selector: 'create-playlist',
  templateUrl: 'create-playlist.component.html',
  styleUrls: ['../app.component.css', 'create-playlist.component.css'],
  providers: [SoundcloudService, SpotifyService]
})

export class CreatePlaylistComponent implements OnInit {

  items: any;
  playlist: Array<any>;
  url: string;
  form: any;
  title: string;
  soundcloudError: boolean;

  constructor(
    private zone: NgZone,
    db: AngularFirestore,
    private router: Router,
    // private builder: FormBuilder,
    private soundcloudService: SoundcloudService,
    private spotifyService: SpotifyService,
    private afs: AngularFirestore,
    private sanitizer: DomSanitizer) {
    this.items = afs.collection<Item>('items');
    this.playlist = [];
    this.sanitizer = sanitizer;
    this.soundcloudError = false;
  }

  ngOnInit() {
    this.form = {
      url: this.url,
      title: this.title
    };
  }

  add(url: string) {
    // IF SOUNDCLOUD
    if(url.substring(0, 23) === 'https://soundcloud.com/') {
      this.soundcloudService
        .getPlayer(url)
        .then(res => {
          let embed_url =
            'https://w.soundcloud.com/player/?url=' +
            res.uri +
            '&amp;auto_play=true&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
          let image_url = res.artwork_url.split('large.jpg')[0];
          image_url = image_url + 't500x500.jpg';
          this.playlist.push({url: url, embed_url: embed_url, image_url: image_url});
      });
    }
    // IF YOUTUBE
    if(url.substring(0, 16) === 'https://youtu.be') {
      let urlID = url.split('be/')[1];
      let embed_url = 'https://www.youtube.com/embed/' + urlID + '?rel=0&autoplay=1';
  	  let image_url = 'http://img.youtube.com/vi/' + urlID + '/maxresdefault.jpg';
      this.playlist.push({url: url, embed_url: embed_url, image_url: image_url});
    }
    if(url.substring(0, 19) === 'https://www.youtube') {
      let urlID = url.split('v=')[1];
      let embed_url = 'https://www.youtube.com/embed/' + urlID + '?rel=0&autoplay=1';
      let image_url = 'http://img.youtube.com/vi/' + urlID + '/maxresdefault.jpg';
      this.playlist.push({url: url, embed_url: embed_url, image_url: image_url});
    }
    // IF SPOTIFY (MIGHT REMOVE AS OPTION)
    if(url.substring(0, 12) === 'https://open') {
      let urlID = url.split('/track/')[1];
      let embed_url = 'https://embed.spotify.com/?uri=spotify%3Atrack%3A' + urlID;
      this.spotifyService.getThumbnail(urlID)
      .then(res => {
        let image_url = res.album.images[0].url;
        this.playlist.push({url: url, embed_url: embed_url, image_url: image_url});
      });
    }
  }

  play(embed_url: string, index: number) {
    let iframes = document.getElementsByTagName('iframe');
    for(let i in this.playlist) {
      if (this.playlist[i].play === true) {
        this.playlist[i].play = false;
        iframes[i].src = '';
      }
    }
    this.playlist[index].play = true;
    iframes[index].src = embed_url;
  }

  remove(index: number) {
    this.playlist.splice(index, 1);
  }

  saniziteUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  save(playlistTitle: any) {
    let date = new Date().toString();
    this.playlist.push({title: playlistTitle._value, createdAt: date, fork_count: 0});
  	let newPlaylistRef = this.items.add(this.playlist);
    let playlistID = newPlaylistRef.key;
    // this.airshipService.createAerostat(playlistID);
    this.router.navigate(['/playlist/view/', playlistID]);
  }

}
