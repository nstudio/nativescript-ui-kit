import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptRive } from '@demo/shared';
import { RiveView } from '@nstudio/nativescript-rive';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptRive {
	riveView: RiveView;
	playing = true;
	onStateChanged() {
		console.log('onStateChanged')
	}

	togglePlay() {
		this.playing = !this.playing;
		this.notifyPropertyChange('playing', this.playing);
		if (this.riveView.isPlaying()) {
			this.riveView.stop()
		  } else {
			this.riveView.play()
		  }
	}

	loadedPlayer(args) {
		this.riveView = args.object;
	}
}
