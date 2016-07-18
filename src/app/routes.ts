import {AppComponent} from './'
import { PlaylistComponent, ForkedPlaylistComponent, CreatePlaylistComponent } from './playlist';

export const PageRoutes = [
	{path: '', component: AppComponent},
	{path: 'playlist/create', component: CreatePlaylistComponent},
	{path: 'playlist/:id', component: PlaylistComponent},
	{path: 'playlist/:id/fork', component: ForkedPlaylistComponent}
]