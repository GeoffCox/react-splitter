import { SplitProps } from '../../../package/src/Split';

export type SplitterType = 'default' | 'solid' | 'striped';

export type SplitOptions = SplitProps & {
  splitterType: SplitterType;
};

export type SplitNode = {
  id: string;
  options?: SplitOptions;
  primaryId?: string;
  secondaryId?: string;
};
