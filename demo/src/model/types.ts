export type SplitDirection = 'LR' | 'TB' | undefined;

export type SplitOptions = {
  splitDirection: SplitDirection;
  initialPrimaryExtent: string;
  minPrimaryExtent: string;
  minSecondaryExtent: string;
  splitterExtent: string;
  splitterType: 'default' | 'striped';
};

export type SplitNode = {
  id: string;
  options?: SplitOptions;
  primaryId?: string;
  secondaryId?: string;
};
