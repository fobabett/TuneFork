import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule, FirebaseAppProvider } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { routing, appRoutingProviders } from "./app.routes";
import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ForkedPlaylistComponent } from './forked-playlist/forked-playlist.component';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { FeedComponent } from './feed/feed.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    ForkedPlaylistComponent,
    CreatePlaylistComponent,
    FeedComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [appRoutingProviders, FirebaseAppProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
