import { SplitProps } from '../../../package/src/Split';

/**
 * The type of splitter to allow for customization.
 */
export type SplitterType = 'default' | 'solid' | 'striped';

/**
 * The type options for each split.
 */
export type SplitOptions = SplitProps & {
  splitterType: SplitterType;
};

/**
 * The state for tracking a split.
 */
export type SplitNode = {
  id: string;
  options?: SplitOptions;
  primaryId?: string;
  secondaryId?: string;
};
