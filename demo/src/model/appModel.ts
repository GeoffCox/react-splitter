import { atom, atomFamily } from 'recoil';
import { SplitNode, SplitOptions } from './types';

/**
 * The state of each split by pane ID.
 */
export const splitStateFamily = atomFamily<SplitNode, string>({
  key: 'splitStateFamily',
  default: (id) => {
    return { id };
  },
});

/**
 * The current split options for new splits.
 */
export const createSplitOptions = atom<SplitOptions>({
  key: 'createSplitOptions',
  default: {
    horizontal: false,
    initialPrimarySize: '50%',
    minPrimarySize: '0px',
    minSecondarySize: '0px',
    splitterSize: '7px',
    splitterType: 'default',
  },
});
