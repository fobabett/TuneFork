import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PlaylistComponent } from './playlist';
import { ForkedPlaylistComponent } from './forked-playlist';
import { CreatePlaylistComponent } from './create-playlist';
import { FeedComponent } from './feed';


const AppRoutes: Routes = [
	{path: '', component: FeedComponent},
	{path: 'create', component: CreatePlaylistComponent},
	{path: 'view/:id', component: PlaylistComponent},
	{path: 'fork/:id', component: ForkedPlaylistComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
