import * as React from 'react';
import styled, { css } from 'styled-components';
import { default as Measure, ContentRect } from 'react-measure';

// -------------------- STYLE --------------------

const defaultSplitterHeight = 5;

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
    topHeight,
    splitterHeight,
    minTopHeight,
    minBottomHeight,
  }: {
    topHeight: string;
    splitterHeight: string;
    minTopHeight: string;
    minBottomHeight: string;
  }): any => ({
    style: {
      gridTemplateRows: `minmax(${minTopHeight},${topHeight}) ${splitterHeight} minmax(${minBottomHeight}, 1fr)`,
    },
  })
)`
  ${fullDivCss}
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'top' 'split' 'bottom';
`;

const Top = styled.div`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  grid-area: top;
`;

const Split = styled.div`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  grid-area: split;
  cursor: row-resize;
  background: transparent;
  &:hover .default-split-visual {
    background: gray;
  },
  user-select: none;
`;

const DefaultSplitVisual = styled.div.attrs(({ splitterHeight }: { splitterHeight: number }): any => ({
  halfHeight: `${splitterHeight / 2}px`,
}))`
  width: 100%;
  height: 1px;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  background: silver;
  cursor: row-resize;
  margin-top: ${(props) => props.halfHeight};
`;

const Bottom = styled.div`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  grid-area: bottom;
`;

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
  renderSplitter?: () => JSX.Element;

  /**
   * When true, if the user double clicks the splitter it will reset to its initial height.
   * The default is false.
   */
  resetOnDoubleClick?: boolean;
};

export const TopBottomSplit = (props: React.PropsWithChildren<TopBottomSplitProps>): JSX.Element => {
  const {
    initialTopHeight,
    minBottomHeight,
    minTopHeight,
    splitterHeight = defaultSplitterHeight,
    renderSplitter,
    resetOnDoubleClick,
  } = props;

  const [currentContentHeight, setCurrentContentHeight] = React.useState<number>(0);
  const [currentTopHeight, setCurrentTopHeight] = React.useState<number>(0);
  const [currentSplitterHeight, setCurrentSplitterHeight] = React.useState<number>(0);

  const [percent, setPercent] = React.useState<number | undefined>(undefined);

  const [clientStart, setClientStart] = React.useState(0);
  const [topStart, setTopStart] = React.useState(0);

  const onContentMeasure = (contentRect: ContentRect) => {
    contentRect.bounds && setCurrentContentHeight(contentRect.bounds.height);
  };

  const onTopMeasure = (contentRect: ContentRect) => {
    contentRect.bounds && setCurrentTopHeight(contentRect.bounds.height);
  };

  const onSplitterMeasure = (contentRect: ContentRect) => {
    contentRect.bounds && setCurrentSplitterHeight(contentRect.bounds.height);
  };

  const onSplitPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setClientStart(event.clientY);
    setTopStart(currentTopHeight);
  };

  const onSplitPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      const topHeight = topStart + (event.clientY - clientStart);
      const newTop = Math.max(0, Math.min(topHeight, currentContentHeight));
      const newPercent = (newTop / currentContentHeight) * 100;
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
  const topChild = children.length > 0 ? children[0] : <div />;
  const bottomChild = children.length > 1 ? children[1] : <div />;

  const renderDimensions = {
    top: percent !== undefined ? `${percent}%` : initialTopHeight,
    minTop: minTopHeight ?? '0px',
    minBottom: minBottomHeight ?? '0px',
  };
  console.log(renderDimensions);

  const renderSplitVisual =
    renderSplitter ??
    (() => {
      return <DefaultSplitVisual className="default-split-visual" splitterHeight={currentSplitterHeight} />;
    });

  return (
    <Measure bounds onResize={onContentMeasure}>
      {({ measureRef }) => (
        <MeasureDiv ref={measureRef}>
          <Root
            topHeight={renderDimensions.top}
            splitterHeight={splitterHeight}
            minTopHeight={renderDimensions.minTop}
            minBottomHeight={renderDimensions.minBottom}
          >
            <Top>
              <Measure bounds onResize={onTopMeasure}>
                {({ measureRef: topRef }) => <MeasureDiv ref={topRef}>{topChild}</MeasureDiv>}
              </Measure>
            </Top>
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
            <Bottom>{bottomChild}</Bottom>
          </Root>
        </MeasureDiv>
      )}
    </Measure>
  );
};
