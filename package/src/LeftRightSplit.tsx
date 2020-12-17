import * as React from 'react';
import { RenderSplitterProps, Split } from './Split';

export type LeftRightSplitProps = {
  /**
   * The initial width of the left pane.
   * Width is specified as a CSS unit (e.g. %, fr, px)
   */
  initialLeftWidth?: string;
  /**
   * The preferred minimum width of the left pane.
   * Width is specified as a CSS unit (e.g. %, fr, px)
   */
  minLeftWidth?: string;
  /**
   * The preferred minimum width of the right pane.
   * Width is specified as a CSS unit (e.g. %, fr, px)
   */
  minRightWidth?: string;
  /**
   * The width of the splitter between the left and right panes.
   * Width is specified as a CSS unit (e.g. %, fr, px)
   */
  splitterWidth?: string;
  /**
   * Render props for the splitter.
   */
  renderSplitter?: (props: RenderSplitterProps) => React.ReactNode | undefined;

  /**
   * When true, if the user double clicks the splitter it will reset to its initial width.
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

export const LeftRightSplit = (props: React.PropsWithChildren<LeftRightSplitProps>) => {
  return (
    <Split
      horizontal={false}
      initialPrimarySize={props.initialLeftWidth}
      minPrimarySize={props.minLeftWidth}
      minSecondarySize={props.minRightWidth}
      splitterSize={props.splitterWidth}
      renderSplitter={props.renderSplitter}
      resetOnDoubleClick={props.resetOnDoubleClick}
      defaultSplitterColors={props.defaultSplitterColors}
    >
      {props.children}
    </Split>
  );
};
