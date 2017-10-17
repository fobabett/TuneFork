import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SpotifyService {

  private spotifyUrl = 'https://api.spotify.com/v1/tracks/';
  constructor(private http: Http) { }

  getThumbnail(id: string) {
    return this.http.get(this.spotifyUrl + id)
      .toPromise()
      .then(response => response.json());
  }

}
