export type SplitDirection = 'LR' | 'TB' | undefined;

export type SplitterType = 'default' | 'solid' | 'striped';

export type SplitOptions = {
  splitDirection: SplitDirection;
  initialPrimaryExtent: string;
  minPrimaryExtent: string;
  minSecondaryExtent: string;
  splitterExtent: string;
  splitterType: SplitterType;
};

export type SplitNode = {
  id: string;
  options?: SplitOptions;
  primaryId?: string;
  secondaryId?: string;
};
