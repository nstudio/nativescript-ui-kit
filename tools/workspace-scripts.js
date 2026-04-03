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
          script: 'nx clean demo',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx debug demo ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx debug demo android',
          description: '⚆  Run Android  🤖',
        },
      },
      '...Angular...': {
        script: `npx cowsay "Test all the Angles!"`,
        description: ` 🔻 Angular`,
      },
      'demo-angular': {
        clean: {
          script: 'nx clean demo-angular',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx debug demo-angular ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx debug demo-angular android',
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
      // @nstudio/nativescript-parallax
      'nativescript-parallax': {
        build: {
          script: 'nx run nativescript-parallax:build.all',
          description: '@nstudio/nativescript-parallax: Build',
        },
      },
      // @nstudio/nativescript-menu
      'nativescript-menu': {
        build: {
          script: 'nx run nativescript-menu:build.all',
          description: '@nstudio/nativescript-menu: Build',
        },
      },
      // @nstudio/nativescript-rich-paste
      'nativescript-rich-paste': {
        build: {
          script: 'nx run nativescript-rich-paste:build.all',
          description: '@nstudio/nativescript-rich-paste: Build',
        },
      },
      // @nstudio/nativescript-calendar
      'nativescript-calendar': {
        build: {
          script: 'nx run nativescript-calendar:build.all',
          description: '@nstudio/nativescript-calendar: Build',
        },
      },
      // @nstudio/nativescript-toolbar
      'nativescript-toolbar': {
        build: {
          script: 'nx run nativescript-toolbar:build.all',
          description: '@nstudio/nativescript-toolbar: Build',
        },
      },
      // @nstudio/nativescript-cloudinary
      'nativescript-cloudinary': {
        build: {
          script: 'nx run nativescript-cloudinary:build.all',
          description: '@nstudio/nativescript-cloudinary: Build',
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
      'nativescript-parallax': {
        script: 'nx run nativescript-parallax:focus',
        description: 'Focus on @nstudio/nativescript-parallax',
      },
      'nativescript-menu': {
        script: 'nx run nativescript-menu:focus',
        description: 'Focus on @nstudio/nativescript-menu',
      },
      'nativescript-rich-paste': {
        script: 'nx run nativescript-rich-paste:focus',
        description: 'Focus on @nstudio/nativescript-rich-paste',
      },
      'nativescript-calendar': {
        script: 'nx run nativescript-calendar:focus',
        description: 'Focus on @nstudio/nativescript-calendar',
      },
      'nativescript-toolbar': {
        script: 'nx run nativescript-toolbar:focus',
        description: 'Focus on @nstudio/nativescript-toolbar',
      },
      'nativescript-cloudinary': {
        script: 'nx run nativescript-cloudinary:focus',
        description: 'Focus on @nstudio/nativescript-cloudinary',
      },
      reset: {
        script: 'node tools/scripts/focus-packages.js',
        description: 'Reset Focus',
      },
    },
    '.....................': {
      script: `npx cowsay "That's all for now folks ~"`,
      description: '.....................',
    },
  },
};
