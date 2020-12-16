import * as React from 'react';
import styled, { css } from 'styled-components';
import { default as Measure, ContentRect } from 'react-measure';

const defaultSplitterWidth = '6px';

const fullDivCss = css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
`;

const MeasureDiv = styled.div`
  ${fullDivCss}
`;

const Root = styled.div.attrs(
  ({
    leftColWidth,
    splitterWidth,
    minLeftColWidth,
    minRightColWidth,
  }: {
    leftColWidth: string;
    splitterWidth: string;
    minLeftColWidth: string;
    minRightColWidth: string;
  }): any => ({
    style: {
      gridTemplateColumns: `minmax(${minLeftColWidth},${leftColWidth}) ${splitterWidth} minmax(${minRightColWidth}, 1fr)`,
    },
  })
)`
  ${fullDivCss}
  display: grid;
  grid-template-rows: 1fr;
  grid-template-areas: 'left split right';
`;

const Left = styled.div`
  height: 100%;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  grid-area: left;
`;

const Split = styled.div`
  height: 100%;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  grid-area: split;
  cursor: col-resize;
  background: transparent;
  &:hover .default-split-visual {
    background: gray;
  }
  user-select: none;
`;

const DefaultSplitVisual = styled.div.attrs(({ splitterWidth }: { splitterWidth: number }): any => ({
  halfWidth: `${splitterWidth / 2}px`,
}))`
  height: 100%;
  width: 2px;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  background: silver;
  cursor: col-resize;
  margin-left: ${(props) => props.halfWidth};
`;

const Right = styled.div`
  height: 100%;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  grid-area: right;
`;

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
  renderSplitter?: () => React.ReactNode | undefined;

  /**
   * When true, if the user double clicks the splitter it will reset to its initial width.
   * The default is false.
   */
  resetOnDoubleClick?: boolean;
};

export const LeftRightSplit = (props: React.PropsWithChildren<LeftRightSplitProps>) => {
  const {
    initialLeftWidth,
    minRightWidth,
    minLeftWidth,
    splitterWidth = defaultSplitterWidth,
    renderSplitter,
    resetOnDoubleClick,
  } = props;

  const [currentContentWidth, setCurrentContentWidth] = React.useState<number>(0);
  const [currentLeftWidth, setCurrentLeftWidth] = React.useState<number>(0);
  const [currentSplitterWidth, setCurrentSplitterWidth] = React.useState<number>(0);

  const [percent, setPercent] = React.useState<number | undefined>(undefined);

  const [clientStart, setClientStart] = React.useState(0);
  const [leftStart, setLeftStart] = React.useState(0);

  const onContentMeasure = (contentRect: ContentRect) => {
    contentRect.bounds && setCurrentContentWidth(contentRect.bounds.width);
  };

  const onLeftMeasure = (contentRect: ContentRect) => {
    contentRect.bounds && setCurrentLeftWidth(contentRect.bounds.width);
  };

  const onSplitterMeasure = (contentRect: ContentRect) => {
    contentRect.bounds && setCurrentSplitterWidth(contentRect.bounds.width);
  };

  const onSplitPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setClientStart(event.clientX);
    setLeftStart(currentLeftWidth);
  };

  const onSplitPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      const leftWidth = leftStart + (event.clientX - clientStart);
      const newLeft = Math.max(0, Math.min(leftWidth, currentContentWidth));
      const newPercent = (newLeft / currentContentWidth) * 100;
      setPercent(newPercent);
    }
  };

  const onSplitPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onSplitDoubleClick = () => {
    resetOnDoubleClick && setPercent(undefined);
  };

  const children = React.Children.toArray(props.children);
  const leftChild = children.length > 0 ? children[0] : <div />;
  const rightChild = children.length > 1 ? children[1] : <div />;

  const renderDimensions = {
    left: percent !== undefined ? `${percent}%` : initialLeftWidth,
    minLeft: minLeftWidth ?? '0px',
    minRight: minRightWidth ?? '0px',
  };

  const renderSplitVisual =
    renderSplitter ??
    (() => {
      return <DefaultSplitVisual className="default-split-visual" splitterWidth={currentSplitterWidth} />;
    });

  return (
    <Measure bounds onResize={onContentMeasure}>
      {({ measureRef }) => (
        <MeasureDiv ref={measureRef}>
          <Root
            leftColWidth={renderDimensions.left}
            splitterWidth={splitterWidth}
            minLeftColWidth={renderDimensions.minLeft}
            minRightColWidth={renderDimensions.minRight}
          >
            <Left>
              <Measure bounds onResize={onLeftMeasure}>
                {({ measureRef: leftRef }) => <MeasureDiv ref={leftRef}>{leftChild}</MeasureDiv>}
              </Measure>
            </Left>
            <Split
              tabIndex={-1}
              onPointerDown={onSplitPointerDown}
              onPointerUp={onSplitPointerUp}
              onPointerMove={onSplitPointerMove}
              onDoubleClick={onSplitDoubleClick}
            >
              <Measure bounds onResize={onSplitterMeasure}>
                {({ measureRef: splitterRef }) => <MeasureDiv ref={splitterRef}>{renderSplitVisual()}</MeasureDiv>}
              </Measure>
            </Split>
            <Right>{rightChild}</Right>
          </Root>
        </MeasureDiv>
      )}
    </Measure>
  );
};
