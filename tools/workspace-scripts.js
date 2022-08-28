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
      // @nstudio/nativescript-hero
			'nativescript-hero': {
				build: {
					script: 'nx run nativescript-hero:build.all',
					description: '@nstudio/nativescript-hero: Build',
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
      'nativescript-hero': {
				script: 'nx run nativescript-hero:focus',
				description: 'Focus on @nstudio/nativescript-hero',
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
