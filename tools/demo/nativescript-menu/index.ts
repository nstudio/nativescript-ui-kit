import { DemoSharedBase } from '../utils';
import { MenuSelectedEvent } from '@nstudio/nativescript-menu';

export class DemoSharedNativescriptMenu extends DemoSharedBase {
  imageIcon = __APPLE__ ? 'sys://plus' : 'res://ic_add';
  addOptions = [
    {
      id: 1,
      name: 'New Chat',
      icon: 'square.and.pencil',
    },
    {
      id: 2,
      name: 'Import from Drive',
      subtitle: 'Login Required',
      icon: 'cloud',
    },
    {
      id: 3,
      name: 'Tiers',
      icon: 'circle.dotted',
      singleSelection: true,
      children: [
        {
          id: 31,
          name: 'Starter',
          subtitle: 'Lean quickstart',
        },
        {
          id: 32,
          name: 'Pro',
          subtitle: 'Growing businesses',
        },
        {
          id: 33,
          name: 'Enterprise',
          subtitle: 'Maximum throughput',
          state: 'on' as const,
        },
      ],
    },
    {
      id: 4,
      name: 'Protocols',
      icon: 'square.2.layers.3d',
      children: [
        {
          id: 41,
          name: 'Add Protocol',
          icon: 'plus',
        },
      ],
    },
    {
      id: 5,
      name: '',
      childrenStyle: 'palette' as const,
      children: [
        { id: 51, name: 'Camera', icon: 'camera' },
        { id: 52, name: 'Photos', icon: 'photo' },
        { id: 53, name: 'Files', icon: 'folder' },
      ],
    },
  ];

  selectOption(args: MenuSelectedEvent) {
    const option = args.data.option;
    console.log('Selected option:', option);
  }
}
