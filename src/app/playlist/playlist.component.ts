import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['playlist.component.css', '../create-playlist/create-playlist.component.css', '../app.component.css']
})
export class PlaylistComponent implements OnInit {
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  playlist: Array<any>;
  id: String;
  forked: boolean;
  forkedFrom: string;
  title: string;
  createdAt: string;
  fork_count: number;
  forkedTitle: string;
  currentIndex: number;
  private itemsSubsrciption: any;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, db: AngularFireDatabase) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.itemsRef = db.list('items/' + this.id);
    this.items = this.itemsRef.valueChanges();
    this.playlist = [];
    this.itemsSubsrciption = this.items
      .subscribe(items=> {
        items.forEach((item: any) => {
          if(item.fork) {
            this.forked = true;
            this.forkedFrom = item.fork.forked_from;
            this.forkedTitle = item.fork.forked_from_title;
          }
          if(item.url && item.embed_url) {
            this.playlist.push({url: item.url, embed_url: item.embed_url, image_url: item.image_url, type: item.type});
          }
          if(item.title && item.createdAt) {
            this.createdAt = item.createdAt;
            this.title = item.title;
            this.fork_count = item.fork_count;
          }
        });
      });
  }

  copyLink(url: string) {
    if(url) {
      let elm = document.getElementById('copyToClipboard');
      elm.innerHTML = url;
      let range = document.createRange();
      range.selectNode(elm);
      window.getSelection().addRange(range);
      document.execCommand('copy');
    }
  }

  play(embed_url: string, index: number) {
    this.currentIndex = index;
    let iframes = document.getElementsByTagName('iframe');
    for(let i in this.playlist) {
      if (this.playlist[i].play === true) {
        this.playlist[i].play = false;
        iframes[i].src = '';
      }
    }
    this.playlist[index].play = true;
    iframes[index].src = embed_url;
    iframes[index].addEventListener('finished', function() {
    });
  }

  playNext() {
    // console.log('iframe finished');
    // this.play(this.playlist[1].embed_url, 1);
  }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
   //    this.id = params['id'];
    // })
  }

  ngOnDestroy() {
    this.itemsSubsrciption.unsubscribe();
  }

  fork(id: string) {
    this.router.navigate(['/fork', this.id]);
  }

  getPlaylist(id: string) {
    this.router.navigate(['/view/', id]);
  }

}
