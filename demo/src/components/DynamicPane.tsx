import * as React from 'react';
// import { LeftRightSplit, TopBottomSplit } from "@geoffcox/react-splitter";
import { LeftRightSplit } from '../../../package/src/LeftRightSplit';
import { TopBottomSplit } from '../../../package/src/TopBottomSplit';
import styled, { css, keyframes } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { createSplitOptions, splitStateFamily } from '../model/appModel';
import { SplitNode } from '../model/types';

const fullDivCss = css`
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
`;

const Root = styled.div`
  ${fullDivCss}
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: 'content';
  user-select: none;
`;

const DemoActions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  outline: none;
  overflow: hidden;
  margin: auto auto;
  font-family: 'Consolas', 'Courier New', Courier, monospace;
  font-size: 10pt;
`;

const ActionButton = styled.button`
  padding: 5px;
  margin: 0 0 5px 5px;
  user-select: none;
`;

const stripeVars = css`
  --stripe-size: 50px;
  --color1: silver;
  --color2: gray;
  --duration: 2s;
`;

const verticalStripeAnimation = keyframes`
  ${stripeVars}
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(var(--stripe-size) * -1));
  }
`;

const horizontalStripeAnimation = keyframes`
  ${stripeVars}
  0% {
    transform: translateX(calc(var(--stripe-size) * -1));
  }
  100% {
    transform: translateX(0);
  }
`;

const HorizontalStripeSplitter = styled.div`
  ${stripeVars}

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% + var(--stripe-size));
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      var(--color2) 25%,
      var(--color2) 50%,
      var(--color1) 50%,
      var(--color1) 75%
    );
    background-size: var(--stripe-size) var(--stripe-size);
    animation: ${horizontalStripeAnimation} var(--duration) linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(#1b2735, 0) 0%, #090a0f 100%);
  }
`;

const VerticalStripeSplitter = styled.div`
  ${stripeVars}

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% + var(--stripe-size));
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      var(--color2) 25%,
      var(--color2) 50%,
      var(--color1) 50%,
      var(--color1) 75%
    );
    background-size: var(--stripe-size) var(--stripe-size);
    animation: ${verticalStripeAnimation} var(--duration) linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(#1b2735, 0) 0%, #090a0f 100%);
  }
`;

type Props = {
  id: string;
  onRemove?: (childId: string) => void;
};

export const DynamicPane = (props: Props) => {
  const { id, onRemove } = props;

  const [splitNode, setSplitNode] = useRecoilState(splitStateFamily(id));
  const { options, primaryId, secondaryId } = splitNode;

  const createOptions = useRecoilValue(createSplitOptions);

  const onSplit = () => {
    const primaryId = uuidv4();
    const secondaryId = uuidv4();
    const newNode: SplitNode = {
      ...splitNode,
      options: createOptions,
      primaryId,
      secondaryId,
    };

    setSplitNode(newNode);
  };

  /**
   * When the child pane notifies it wants to be removed, the remaining pane should 'replace' this pane.
   * We do this by saving the remaining pane's split options as this pane's split options.
   * Finally, we clear up the child and remaining state.
   */
  const onRemoveChildPane = useRecoilCallback(
    ({ snapshot, set, reset }) => async (childId: string) => {
      const node = await snapshot.getPromise(splitStateFamily(id));

      const remainingId =
        node?.primaryId === childId ? node.secondaryId : node?.secondaryId === childId ? node.primaryId : undefined;

      if (remainingId === undefined) {
        return;
      }

      const remainingNode = await snapshot.getPromise(splitStateFamily(remainingId));

      set(splitStateFamily(id), {
        ...remainingNode,
        id: node.id,
      });

      reset(splitStateFamily(childId));
      reset(splitStateFamily(remainingId));
    },
    [id]
  );

  const renderCustomHorizontalSplit = () => {
    return <HorizontalStripeSplitter />;
  };

  const renderCustomVerticalSplit = () => {
    return <VerticalStripeSplitter />;
  };

  const renderActions = () => {
    return (
      <>
        <DemoActions>
          <ActionButton onClick={onSplit}>Split</ActionButton>
          {onRemove && (
            <ActionButton onClick={() => onRemove(id)} title="Remove Split">
              X
            </ActionButton>
          )}
        </DemoActions>
      </>
    );
  };

  const renderLeftRightSplit = () => {
    return (
      <LeftRightSplit
        initialLeftWidth={options?.initialPrimaryExtent}
        minLeftWidth={options?.minPrimaryExtent}
        minRightWidth={options?.minSecondaryExtent}
        renderSplitter={options?.splitterType === 'striped' ? renderCustomVerticalSplit : undefined}
        splitterWidth={options?.splitterExtent}
        resetOnDoubleClick={true}
      >
        {primaryId ? <DynamicPane id={primaryId} onRemove={onRemoveChildPane} /> : <div>ERROR</div>}
        {secondaryId ? <DynamicPane id={secondaryId} onRemove={onRemoveChildPane} /> : <div>ERROR</div>}
      </LeftRightSplit>
    );
  };

  const renderTopBottomSplit = () => {
    return (
      <TopBottomSplit
        initialTopHeight={options?.initialPrimaryExtent}
        minTopHeight={options?.minPrimaryExtent}
        minBottomHeight={options?.minSecondaryExtent}
        renderSplitter={options?.splitterType === 'striped' ? renderCustomHorizontalSplit : undefined}
        splitterHeight={options?.splitterExtent}
        resetOnDoubleClick={true}
      >
        {primaryId ? <DynamicPane id={primaryId} onRemove={onRemoveChildPane} /> : <div>ERROR</div>}
        {secondaryId ? <DynamicPane id={secondaryId} onRemove={onRemoveChildPane} /> : <div>ERROR</div>}
      </TopBottomSplit>
    );
  };

  const renderLayout = () => {
    switch (options?.splitDirection) {
      case 'TB':
        return renderTopBottomSplit();
      case 'LR':
        return renderLeftRightSplit();
      default:
        return renderActions();
    }
  };

  return <Root>{renderLayout()}</Root>;
};
