import { Control, ControlGroup } from "@angular/common";

interface ValidationResult{
   [key:string]:boolean;
}

export class LinkValidator {
	// checks for valid youtube | soundcloud | spotify urls
	static validUrl(control: Control): ValidationResult {
		if(control.value) {
			if(control.value.substring(0, 32) != 'https://www.youtube.com/watch?v=' && control.value.substring(0, 17) != 'https://youtu.be/' && control.value.substring(0, 23) != 'https://soundcloud.com/' && control.value.substring(0, 31) != 'https://open.spotify.com/track/') {
				
				return {'validUrl': true};
			}
		}
		return null;
	}
}
