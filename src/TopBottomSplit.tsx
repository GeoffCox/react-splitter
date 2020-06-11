import * as React from 'react';
import styled, { css } from 'styled-components';
import { default as Measure, ContentRect } from 'react-measure';

// -------------------- STYLE --------------------

const splitterHeight = 5;
const splitterHeightPx = `${splitterHeight}px`;

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

const Root = styled.div.attrs(({ topRowHeight }: { topRowHeight: string }): any => ({
    style: {
        gridTemplateRows: `${topRowHeight} ${splitterHeightPx} 1fr`,
    },
}))`
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
    background: silver;
    grid-area: split;
    cursor: row-resize;
    outline: none;
    &:hover: {
        background: gray;
    }
`;

const Bottom = styled.div`
    width: 100%;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    grid-area: bottom;
`;

// -------------------- UTILITIES --------------------

// ensures a value can be used in gridTemplateColumns
// defaults to '1fr'
const toGridExtent = (value?: string | number) => {
    if (value === undefined || value === null) {
        return '1fr';
    }

    if (typeof value === 'string') {
        if (value.trim().length === 0) {
            return '1fr';
        }

        if (value.endsWith('px') || value.endsWith('%') || value.endsWith('fr')) {
            return value;
        }
    }

    return `${value}px`;
};

// constrains the extend of a pane given split constraints
const constrainPaneExtent = (
    primary: number,
    constraints: {
        total: number;
        splitter: number;
        minPrimary?: number;
        minSecondary?: number;
    }
): number => {
    const { total, splitter, minPrimary, minSecondary } = constraints;

    // ensure within total bounds
    let newPrimary = Math.max(0, Math.min(primary, total - splitter));

    // adjust satisfy minSecondary
    const secondary = total - (newPrimary + splitter);
    if (minSecondary && secondary < minSecondary) {
        newPrimary = newPrimary - Math.max(0, minSecondary - secondary);
    }

    // adjust to satisfy minPrimary
    if (minPrimary && newPrimary < minPrimary) {
        newPrimary = minPrimary;
    }

    // ensure within total bounds after adjustments
    return Math.max(0, Math.min(newPrimary, total - splitter));
};

// -------------------- COMPONENT --------------------

type Props = {
    initialTopGridHeight?: string | number;
    minTopPixels?: number;
    minBottomPixels?: number;
};

export const TopBottomSplit = (props: React.PropsWithChildren<Props>): JSX.Element => {
    const { initialTopGridHeight, minBottomPixels, minTopPixels } = props;

    // -------------------- HOOKS --------------------

    const [currentContentHeight, setCurrentContentHeight] = React.useState<number>(0);
    const [currentTopHeight, setCurrentTopHeight] = React.useState<number>(0);

    const [topHeight, setTopHeight] = React.useState(() => {
        // If the default is a number, then use it or the top minimum as a value.
        const numericValue = Number(initialTopGridHeight);
        return isNaN(numericValue) ? -1 : Math.max(numericValue, minTopPixels ?? numericValue);
    });

    const [topStart, setTopStart] = React.useState(0);
    const [screenStart, setScreenStart] = React.useState(0);

    // -------------------- MEASUREMENT --------------------

    const constrainTop = (value: number): number => {
        return constrainPaneExtent(value, {
            total: currentContentHeight,
            splitter: splitterHeight,
            minPrimary: minTopPixels,
            minSecondary: minBottomPixels,
        });
    };

    const onContentMeasure = (contentRect: ContentRect) => {
        contentRect.bounds && setCurrentContentHeight(contentRect.bounds.height);
    };

    const onTopMeasure = (contentRect: ContentRect) => {
        contentRect.bounds && setCurrentTopHeight(contentRect.bounds.height);
    };

    // -------------------- MOUSE HANDLERS --------------------

    const onSplitMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(1);
        setScreenStart(event.screenY);
        setTopStart(currentTopHeight);
    };

    const onSplitMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget.hasPointerCapture(1)) {
            // calculate candidate top
            const newTop = constrainTop(topStart + (event.screenY - screenStart));
            setTopHeight(newTop);
        }
    };

    const onSplitMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
        event.currentTarget.releasePointerCapture(1);
    };

    // -------------------- RENDER --------------------

    // If the top height has never been set
    // try using the default as a number and constraining it
    let renderTopHeight = `${topHeight}px`;
    if (topHeight < 0) {
        renderTopHeight = toGridExtent(initialTopGridHeight);
    }

    const children = React.Children.toArray(props.children);
    const topChild = children.length > 0 ? children[0] : <div />;
    const bottomChild = children.length > 1 ? children[1] : <div />;

    return (
        <Measure bounds onResize={onContentMeasure}>
            {({ measureRef }) => (
                <MeasureDiv ref={measureRef}>
                    <Root topRowHeight={renderTopHeight}>
                        <Top>
                            <Measure bounds onResize={onTopMeasure}>
                                {({ measureRef: topRef }) => <MeasureDiv ref={topRef}>{topChild}</MeasureDiv>}
                            </Measure>
                        </Top>
                        <Split tabIndex={-1} onMouseDown={onSplitMouseDown} onMouseMove={onSplitMouseMove} onMouseUp={onSplitMouseUp} />
                        <Bottom>{bottomChild}</Bottom>
                    </Root>
                </MeasureDiv>
            )}
        </Measure>
    );
};
