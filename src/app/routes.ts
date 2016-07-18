import {AppComponent} from './'
import { PlaylistComponent, ForkedPlaylistComponent, CreatePlaylistComponent } from './playlist';
import { LandingComponent } from './landing';

export const PageRoutes = [
	{path: '', component: LandingComponent},
	{path: 'playlist/create', component: CreatePlaylistComponent},
	{path: 'playlist/:id', component: PlaylistComponent},
	{path: 'playlist/:id/fork', component: ForkedPlaylistComponent}
]
