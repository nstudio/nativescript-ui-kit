import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptRive } from '@demo/shared';
import { TypeRiveDirection, TypeRiveLoop, RiveView } from '@nstudio/nativescript-rive';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptRive {
	riveView: RiveView;
	playing = true;
	stopText = `Where we're going, we don't need roads ...`
	playText = `I guess you guys aren't ready for that yet ... Or are you?`
	inputValue = true;
	onStateChanged(args) {
		console.log('onStateChanged')
	}

	ready = false;
	togglePlay() {
		this.inputValue = !this.inputValue;
		this.notifyPropertyChange('inputValue', this.inputValue);
		return;

		this.notifyPropertyChange('playing', this.playing);
		if (this.riveView.isPlaying()) {
			this.riveView.pause()
			if (this.ready) {
				this.stopText =  `Let's do this ⚡ Rive is Alive!`
				this.notifyPropertyChange('stopText', `Let's do this ⚡ Rive is Alive!`)
			} else {

				this.stopText = 'I mean ... I figured you were ...'
				this.notifyPropertyChange('stopText', 'I mean ... I figured you were ...')
			}
		  } else {
			if (this.ready) {
				
				this.riveView.play(TypeRiveLoop.PINGPONG, TypeRiveDirection.BACKWARDS);
			} else {
				this.playText =  `Let's do this ⚡`
				this.notifyPropertyChange('playText', `Let's do this ⚡`)
			// 	this.stopText = this.playText
			// this.notifyPropertyChange('stopText', this.playText)
				this.ready = true;
				this.riveView.play();
			}
		  }
		  this.playing = !this.playing;
		  this.notifyPropertyChange('playing', this.playing)
	}

	loadedPlayer(args) {
		this.riveView = args.object;
	}
}
