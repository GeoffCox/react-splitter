import { atom, atomFamily } from 'recoil';
import { SplitNode, SplitOptions } from './types';

export const splitStateFamily = atomFamily<SplitNode, string>({
  key: 'splitStateFamily',
  default: (id) => {
    return { id };
  },
});

export const createSplitOptions = atom<SplitOptions>({
  key: 'createSplitOptions',
  default: {
    splitDirection: 'LR',
    initialPrimaryExtent: '50%',
    minPrimaryExtent: '0px',
    minSecondaryExtent: '0px',
    splitterExtent: '6px',
    splitterType: 'default',
  },
});
