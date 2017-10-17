import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { LinkValidator } from '../link-validator';
import { SoundcloudService } from '../soundcloud.service';
import { SpotifyService } from '../spotify.service';
// import { AirshipService } from '../../airship.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'forked-playlist',
  templateUrl: 'forked-playlist.component.html',
  styleUrls: ['../app.component.css', '../create-playlist/create-playlist.component.css', '../playlist/playlist.component.css'],
  providers: [SoundcloudService, SpotifyService]
})

export class ForkedPlaylistComponent implements OnInit {
  forkedItems: any;
  id: string;
  items: AngularFireList<any>;
  itemsRef: AngularFireList<any>;
  playlist: Array<any>;
  forked: boolean;
  url: string;
  title: string;
  forkedTitle: string;
  fork_count: number;
  itemsSubsrciption: any;
  forkedItemsSubsciption: any;
  forkKey: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private sanitizer: DomSanitizer,
    private spotifyService: SpotifyService,
    private soundcloudService: SoundcloudService) {
    this.sanitizer = sanitizer;
    this.id = this.route.snapshot.params.id;
    this.itemsRef = db.list('items/' + this.id);
    this.forkedItems = this.itemsRef.valueChanges();
    this.items = db.list('items');
    // this.items = af.database.list('/items');
    this.playlist = [];

    this.forkedItemsSubsciption = this.forkedItems
      .subscribe(items=> {
        items.forEach((item:any) => {
          if(item.url && item.embed_url) {
            this.playlist.push({url: item.url, embed_url: item.embed_url, image_url: item.image_url});
          }
          if(item.title) {
            this.forkedTitle = item.title;
            this.title = item.title;
          }
          if(item.fork_count !== undefined) {
            this.fork_count = item.fork_count+1;
            this.forkKey = item.$key;
          }
        });
      });
  }

  ngOnInit() {
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
            '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
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
      let embed_url = 'https://www.youtube.com/embed/' + urlID +'?rel=0&autoplay=1';
      let image_url = 'http://img.youtube.com/vi/' + urlID + '/maxresdefault.jpg';
      this.playlist.push({url: url, embed_url: embed_url, image_url: image_url});
    }
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

  newTitle(title: any) {
    this.title = title;
  }

  saniziteUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  save() {
    let date = new Date().toString();
    this.playlist.push(
      {
        title: this.title,
        createdAt: date,
        fork: {
          forked_from: this.id,
          forked_from_title:
          this.forkedTitle
        },
        fork_count: 0
      });
    let newPlaylistRef = this.items.push(this.playlist);
    let playlistID = newPlaylistRef.key;
    this.forkedItems.update(this.forkKey, {fork_count: this.fork_count});
    // this.airshipService.createAerostat(playlistID);
    this.router.navigate(['/view/', playlistID]);
  }

  ngOnDestroy() {
    // this.itemsSubsrciption.unsubscribe();
    this.forkedItemsSubsciption.unsubscribe();
  }

}
