import * as React from 'react';
import styled, { css } from 'styled-components';
import { default as Measure, ContentRect } from 'react-measure';
import { DefaultSplitter } from './DefaultSplitter';
import { RenderSplitterProps } from './RenderSplitterProps';
import { useDebounce } from './useDebounceHook';

const stdDivCss = css`
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
`;

const fullDivCss = css`
  ${stdDivCss}
  width: 100%;
  height: 100%;
`;

const FullDiv = styled.div`
  ${fullDivCss}
`;

// To improve performance, the dynamic style feature of styled components puts the template row &columns into the style property.
const Root = styled.div.attrs(
  ({
    horizontal,
    primarySize,
    splitterSize,
    minPrimarySize,
    minSecondarySize,
  }: {
    horizontal: boolean;
    primarySize: string;
    splitterSize: string;
    minPrimarySize: string;
    minSecondarySize: string;
  }): any => ({
    gridTemplateAreas: horizontal ? '"primary" "split" "secondary"' : '"primary split secondary"',
    style: horizontal
      ? {
          gridTemplateColumns: '1fr',
          gridTemplateRows: `minmax(${minPrimarySize},${primarySize}) ${splitterSize} minmax(${minSecondarySize}, 1fr)`,
        }
      : {
          gridTemplateColumns: `minmax(${minPrimarySize},${primarySize}) ${splitterSize} minmax(${minSecondarySize}, 1fr)`,
          gridTemplateRows: '1fr',
        },
  })
)`
  ${fullDivCss}
  display: grid;
  grid-template-areas: ${(props) => props.gridTemplateAreas};
`;

const Primary = styled.div.attrs(({ horizontal }: { horizontal: boolean }): any => ({
  height: horizontal ? 'auto' : '100%',
  width: horizontal ? '100%' : 'auto',
}))`
  ${stdDivCss}
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  grid-area: primary;
`;

const Splitter = styled.div.attrs(({ horizontal }: { horizontal: boolean }): any => ({
  height: horizontal ? 'auto' : '100%',
  width: horizontal ? '100%' : 'auto',
  cursor: horizontal ? 'row-resize' : 'col-resize',
}))`
  ${stdDivCss}
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  cursor: ${(props) => props.cursor};
  grid-area: split;
  background: transparent;
  user-select: none;
`;

const Secondary = styled.div.attrs(({ horizontal }: { horizontal: boolean }): any => ({
  height: horizontal ? 'auto' : '100%',
  width: horizontal ? '100%' : 'auto',
}))`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  grid-area: secondary;
`;

export type SplitMeasuredSizes = {
  /**
   * The measured size of the primary pane in pixels.
   */
  primary: number;
  /**
   * The measured size of the splitter in pixels.
   */
  splitter: number;
  /**
   * The measured size of the secondary pane in pixels.
   */
  secondary: number;
};

export type SplitProps = {
  /**
   * Add this attribute or set to true to create a top/bottom split.
   * Set to false to create a left|right split.
   */
  horizontal?: boolean;
  /**
   * The initial width/height of the left/top pane.
   * Width is specified as a CSS unit (e.g. %, fr, px).
   * The default is 50%.
   */
  initialPrimarySize?: string;
  /**
   * The preferred minimum width/height of the left/top pane.
   * Specified as a CSS unit (e.g. %, fr, px).
   * The default is 0.
   */
  minPrimarySize?: string;
  /**
   * The preferred minimum width/height of the right/bottom pane.
   * Specified as a CSS unit (e.g. %, fr, px).
   * The default is 0.
   */
  minSecondarySize?: string;
  /**
   * The width of the splitter between the panes.
   * Specified as a CSS unit (e.g. %, fr, px).
   * The default is 7px.
   */
  splitterSize?: string;
  /**
   * Render props for the splitter.
   * @param pixelSize The measured size of the splitter in pixels.
   * @param horizontal True if the splitter is horizontal (i.e. top/bottom); false otherwise.
   */
  renderSplitter?: (props: RenderSplitterProps) => React.ReactNode | undefined;
  /**
   * When true, if the user double clicks the splitter it will reset to its initial position.
   * The default is false.
   */
  resetOnDoubleClick?: boolean;
  /**
   * The colors to use for the default splitter.
   * Only used when renderSplitter is undefined;
   * The defaults are silver, gray, and black
   */
  defaultSplitterColors?: {
    color: string;
    hover: string;
    drag: string;
  };

  /**
   * Raised when the splitter moves to provide the primary size.
   * When the user has adjusted the splitter, this will be a percentage.
   * Otherwise, this will be the initialPrimarySize.
   */
  onSplitChanged?: (primarySize: string) => void;

  /**
   * Raised whenever the primary, splitter, or secondary measured sizes change.
   * These values are debounced at 500ms to prevent spamming this event.
   */
  onMeasuredSizesChanged?: (sizes: SplitMeasuredSizes) => void;
};

export const Split = (props: React.PropsWithChildren<SplitProps>) => {
  const {
    horizontal = false,
    initialPrimarySize = '50%',
    minPrimarySize = '0px',
    minSecondarySize = '0px',
    splitterSize = '7px',
    renderSplitter,
    resetOnDoubleClick = false,
    defaultSplitterColors = {
      color: 'silver',
      hover: 'gray',
      drag: 'black',
    },
    onSplitChanged,
    onMeasuredSizesChanged,
  } = props;

  const [currentContentSize, setCurrentContentSize] = React.useState<number>(0);
  const [currentPrimarySize, setCurrentPrimarySize] = React.useState<number>(0);
  const [currentSplitterSize, setCurrentSplitterSize] = React.useState<number>(0);

  const [percent, setPercent] = React.useState<number | undefined>(undefined);

  const [clientStart, setClientStart] = React.useState(0);
  const [primaryStart, setPrimaryStart] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  const debouncedContentSize = useDebounce(currentContentSize, 500);
  const debouncedPrimarySize = useDebounce(currentPrimarySize, 500);
  const debouncedSplitterSize = useDebounce(currentSplitterSize, 500);

  React.useEffect(() => {
    if (onSplitChanged) {
      onSplitChanged(percent !== undefined ? `${percent}%` : initialPrimarySize);
    }
  }, [percent, initialPrimarySize]);

  React.useEffect(() => {
    if (onMeasuredSizesChanged) {
      onMeasuredSizesChanged({
        primary: debouncedPrimarySize,
        splitter: debouncedSplitterSize,
        secondary: debouncedContentSize - (debouncedPrimarySize + debouncedSplitterSize),
      });
    }
  }, [debouncedContentSize, debouncedPrimarySize, debouncedSplitterSize]);

  const onMeasureContent = (contentRect: ContentRect) => {
    contentRect.bounds && setCurrentContentSize(horizontal ? contentRect.bounds.height : contentRect.bounds.width);
  };

  const onMeasurePrimary = (contentRect: ContentRect) => {
    contentRect.bounds && setCurrentPrimarySize(horizontal ? contentRect.bounds.height : contentRect.bounds.width);
  };

  const onMeasureSplitter = (contentRect: ContentRect) => {
    contentRect.bounds && setCurrentSplitterSize(horizontal ? contentRect.bounds.height : contentRect.bounds.width);
  };

  const onSplitPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setClientStart(horizontal ? event.clientY : event.clientX);
    setPrimaryStart(currentPrimarySize);
    setDragging(true);
  };

  const onSplitPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      const position = horizontal ? event.clientY : event.clientX;
      const primarySize = primaryStart + (position - clientStart);
      const newPrimary = Math.max(0, Math.min(primarySize, currentContentSize));
      const newPercent = (newPrimary / currentContentSize) * 100;
      setPercent(newPercent);
    }
  };

  const onSplitPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(false);
  };

  const onSplitDoubleClick = () => {
    resetOnDoubleClick && setPercent(undefined);
  };

  const children = React.Children.toArray(props.children);
  const primaryChild = children.length > 0 ? children[0] : <div />;
  const secondaryChild = children.length > 1 ? children[1] : <div />;

  const renderSizes = {
    primary: percent !== undefined ? `${percent}%` : initialPrimarySize,
    minPrimary: minPrimarySize ?? '0px',
    minSecondary: minSecondarySize ?? '0px',
  };

  const renderSplitterProps = {
    pixelSize: currentSplitterSize,
    horizontal,
    dragging: dragging,
  };

  const renderSplitVisual =
    renderSplitter ??
    (() => {
      return (
        <DefaultSplitter
          {...renderSplitterProps}
          color={dragging ? defaultSplitterColors.drag : defaultSplitterColors.color}
          hoverColor={dragging ? defaultSplitterColors.drag : defaultSplitterColors.hover}
        />
      );
    });

  return (
    <Measure bounds onResize={onMeasureContent}>
      {({ measureRef: contentRef }) => (
        <FullDiv ref={contentRef}>
          <Root
            horizontal={horizontal}
            primarySize={renderSizes.primary}
            splitterSize={splitterSize}
            minPrimarySize={renderSizes.minPrimary}
            minSecondarySize={renderSizes.minSecondary}
          >
            <Primary horizontal={horizontal}>
              <Measure bounds onResize={onMeasurePrimary}>
                {({ measureRef: primaryRef }) => <FullDiv ref={primaryRef}>{primaryChild}</FullDiv>}
              </Measure>
            </Primary>
            <Splitter
              horizontal={horizontal}
              tabIndex={-1}
              onPointerDown={onSplitPointerDown}
              onPointerUp={onSplitPointerUp}
              onPointerMove={onSplitPointerMove}
              onDoubleClick={onSplitDoubleClick}
            >
              <Measure bounds onResize={onMeasureSplitter}>
                {({ measureRef: splitterRef }) => (
                  <FullDiv ref={splitterRef}>{renderSplitVisual(renderSplitterProps)}</FullDiv>
                )}
              </Measure>
            </Splitter>
            <Secondary horizontal={horizontal}>{secondaryChild}</Secondary>
          </Root>
        </FullDiv>
      )}
    </Measure>
  );
};
