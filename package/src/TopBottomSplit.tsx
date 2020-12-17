import * as React from 'react';
import { RenderSplitterProps, Split } from './Split';

export type TopBottomSplitProps = {
  /**
   * The initial height of the top pane.
   * Height is specified as a CSS unit (e.g. %, fr, px)
   */
  initialTopHeight?: string;
  /**
   * The preferred minimum height of the top pane.
   * Height is specified as a CSS unit (e.g. %, fr, px)
   */
  minTopHeight?: string;
  /**
   * The preferred minimum height of the bottom pane.
   * Height is specified as a CSS unit (e.g. %, fr, px)
   */
  minBottomHeight?: string;
  /**
   * The height of the splitter between the top and bottom panes.
   * Height is specified as a CSS unit (e.g. %, fr, px)
   */
  splitterHeight?: string;
  /**
   * Render props for the splitter.
   */
  renderSplitter?: (props: RenderSplitterProps) => React.ReactNode | undefined;

  /**
   * When true, if the user double clicks the splitter it will reset to its initial height.
   * The default is false.
   */
  resetOnDoubleClick?: boolean;
  /**
   * The colors to use for the default splitter.
   * Only used when renderSplitter is undefined;
   * The defaults are silver, gray, and darkgray
   */
  defaultSplitterColors?: {
    color: string;
    hover: string;
    drag: string;
  };
};

export const TopBottomSplit = (props: React.PropsWithChildren<TopBottomSplitProps>) => {
  return (
    <Split
      horizontal={true}
      initialPrimarySize={props.initialTopHeight}
      minPrimarySize={props.minTopHeight}
      minSecondarySize={props.minBottomHeight}
      splitterSize={props.splitterHeight}
      renderSplitter={props.renderSplitter}
      resetOnDoubleClick={props.resetOnDoubleClick}
      defaultSplitterColors={props.defaultSplitterColors}
    >
      {props.children}
    </Split>
  );
};
