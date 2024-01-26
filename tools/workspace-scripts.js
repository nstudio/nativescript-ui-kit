module.exports = {
  message: 'NativeScript Plugins ~ made with ❤️  Choose a command to start...',
  pageSize: 32,
  scripts: {
    default: 'nps-i',
    nx: {
      script: 'nx',
      description: 'Execute any command with the @nrwl/cli',
    },
    format: {
      script: 'nx format:write',
      description: 'Format source code of the entire workspace (auto-run on precommit hook)',
    },
    '🔧': {
      script: `npx cowsay "NativeScript plugin demos make developers 😊"`,
      description: '_____________  Apps to demo plugins with  _____________',
    },
    // demos
    apps: {
      '...Vanilla...': {
        script: `npx cowsay "Nothing wrong with vanilla 🍦"`,
        description: ` 🔻 Vanilla`,
      },
      demo: {
        clean: {
          script: 'nx run demo:clean',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx run demo:ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx run demo:android',
          description: '⚆  Run Android  🤖',
        },
      },
      '...Angular...': {
        script: `npx cowsay "Test all the Angles!"`,
        description: ` 🔻 Angular`,
      },
      'demo-angular': {
        clean: {
          script: 'nx run demo-angular:clean',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx run demo-angular:ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx run demo-angular:android',
          description: '⚆  Run Android  🤖',
        },
      },
    },
    '⚙️': {
      script: `npx cowsay "@nstudio/* packages will keep your ⚙️ cranking"`,
      description: '_____________  @nstudio/*  _____________',
    },
    // packages
    // build output is always in dist/packages
    '@nstudio': {
      // @nstudio/nativescript-label-marquee
      'nativescript-label-marquee': {
        build: {
          script: 'nx run nativescript-label-marquee:build.all',
          description: '@nstudio/nativescript-label-marquee: Build',
        },
      },
      // @nstudio/nativescript-shimmer
      'nativescript-shimmer': {
        build: {
          script: 'nx run nativescript-shimmer:build.all',
          description: '@nstudio/nativescript-shimmer: Build',
        },
      },
      // @nstudio/nativescript-coachmarks
			'nativescript-coachmarks': {
				build: {
					script: 'nx run nativescript-coachmarks:build.all',
					description: '@nstudio/nativescript-coachmarks: Build',
				},
			},
			// nativescript-fonticon
			'nativescript-fonticon': {
				build: {
					script: 'nx run nativescript-fonticon:build.all',
					description: 'nativescript-fonticon: Build',
				},
			},
			// @nstudio/nativescript-smartlook
			'nativescript-smartlook': {
				build: {
					script: 'nx run nativescript-smartlook:build.all',
					description: '@nstudio/nativescript-smartlook: Build',
				},
			},
			// @nstudio/nativescript-variable-blur-view
			'nativescript-variable-blur-view': {
				build: {
					script: 'nx run nativescript-variable-blur-view:build.all',
					description: '@nstudio/nativescript-variable-blur-view: Build',
				},
			},
			// @nstudio/nativescript-fluid-segmented-bar
			'nativescript-fluid-segmented-bar': {
				build: {
					script: 'nx run nativescript-fluid-segmented-bar:build.all',
					description: '@nstudio/nativescript-fluid-segmented-bar: Build',
				},
			},
			// @nstudio/nativescript-markdown-view
			'nativescript-markdown-view': {
				build: {
					script: 'nx run nativescript-markdown-view:build.all',
					description: '@nstudio/nativescript-markdown-view: Build',
				},
			},
			'build-all': {
        script: 'nx run-many --target=build.all --all',
        description: 'Build all packages',
      },
    },
    '⚡': {
      script: `npx cowsay "Focus only on source you care about for efficiency ⚡"`,
      description: '_____________  Focus (VS Code supported)  _____________',
    },
    focus: {
      'nativescript-label-marquee': {
        script: 'nx run nativescript-label-marquee:focus',
        description: 'Focus on @nstudio/nativescript-label-marquee',
      },
      'nativescript-shimmer': {
        script: 'nx run nativescript-shimmer:focus',
        description: 'Focus on @nstudio/nativescript-shimmer',
      },
      'nativescript-coachmarks': {
				script: 'nx run nativescript-coachmarks:focus',
				description: 'Focus on @nstudio/nativescript-coachmarks',
			},
			'nativescript-fonticon': {
				script: 'nx run nativescript-fonticon:focus',
				description: 'Focus on nativescript-fonticon',
			},
			'nativescript-smartlook': {
				script: 'nx run nativescript-smartlook:focus',
				description: 'Focus on @nstudio/nativescript-smartlook',
			},
			'nativescript-variable-blur-view': {
				script: 'nx run nativescript-variable-blur-view:focus',
				description: 'Focus on @nstudio/nativescript-variable-blur-view',
			},
			'nativescript-fluid-segmented-bar': {
				script: 'nx run nativescript-fluid-segmented-bar:focus',
				description: 'Focus on @nstudio/nativescript-fluid-segmented-bar',
			},
			'nativescript-markdown-view': {
				script: 'nx run nativescript-markdown-view:focus',
				description: 'Focus on @nstudio/nativescript-markdown-view',
			},
			reset: {
        script: 'nx g @nativescript/plugin-tools:focus-packages',
        description: 'Reset Focus',
      },
    },
    '.....................': {
      script: `npx cowsay "That's all for now folks ~"`,
      description: '.....................',
    },
  },
};
