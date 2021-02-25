import * as React from 'react';
import { DefaultSplitter, Split, RenderSplitterProps } from '@geoffcox/react-splitter';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { createSplitOptions, splitStateFamily } from '../model/appModel';
import { SplitNode } from '../model/types';
import { VerticalStripedSplitter, HorizontalStripedSplitter, SolidSplitter } from './CustomSplitters';

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

const ActionsArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-content: stretch;
  align-items: stretch;
  outline: none;
  overflow: hidden;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  outline: none;
  overflow: hidden;
  margin: auto auto;
`;

const ActionButton = styled.button`
  padding: 5px;
  margin: 0 0 5px 5px;
  user-select: none;
`;

type Props = {
  id: string;
  onRemove?: (childId: string) => void;
};

/**
 * A pane that can be split recursively.
 * @param props
 */
export const DynamicPane = (props: Props) => {
  const { id, onRemove } = props;

  const [splitNode, setSplitNode] = useRecoilState(splitStateFamily(id));
  const { options, primaryId, secondaryId } = splitNode;
  const createOptions = useRecoilValue(createSplitOptions);

  // When a split occurs, a unique ID is assigned to each pane for tracking later.
  // This is for demo purposes and not necessary to use the react-splitter.
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

  // When the child pane notifies it wants to be removed, the remaining pane should 'replace' this pane.
  // We do this by saving the remaining pane's split options as this pane's split options.
  // Finally, we clear up the child and remaining state.
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

  const renderActions = () => {
    return (
      <ActionsArea>
        <ActionButtons>
          <ActionButton onClick={onSplit}>Split</ActionButton>
          {onRemove && (
            <ActionButton onClick={() => onRemove(id)} title="Remove Split">
              X
            </ActionButton>
          )}
        </ActionButtons>
      </ActionsArea>
    );
  };

  const renderSplitter = (renderSplitterProps: RenderSplitterProps) => {
    const { horizontal } = renderSplitterProps;
    switch (options?.splitterType) {
      case 'solid':
        return <SolidSplitter />;
      case 'striped':
        return horizontal ? <HorizontalStripedSplitter /> : <VerticalStripedSplitter />;
      default:
        return <DefaultSplitter {...renderSplitterProps} color="silver" hoverColor="gray" />;
    }
  };

  const renderLeftRightSplit = () => {
    return (
      options && (
        <Split
          initialPrimarySize={options.initialPrimarySize}
          minPrimarySize={options.minPrimarySize}
          minSecondarySize={options.minSecondarySize}
          renderSplitter={renderSplitter}
          splitterSize={options.splitterSize}
          resetOnDoubleClick
        >
          {primaryId ? <DynamicPane id={primaryId} onRemove={onRemoveChildPane} /> : <div>ERROR</div>}
          {secondaryId ? <DynamicPane id={secondaryId} onRemove={onRemoveChildPane} /> : <div>ERROR</div>}
        </Split>
      )
    );
  };

  const renderTopBottomSplit = () => {
    return (
      <Split
        horizontal
        initialPrimarySize={options?.initialPrimarySize}
        minPrimarySize={options?.minPrimarySize}
        minSecondarySize={options?.minSecondarySize}
        renderSplitter={renderSplitter}
        splitterSize={options?.splitterSize}
        resetOnDoubleClick
      >
        {primaryId ? <DynamicPane id={primaryId} onRemove={onRemoveChildPane} /> : <div>ERROR</div>}
        {secondaryId ? <DynamicPane id={secondaryId} onRemove={onRemoveChildPane} /> : <div>ERROR</div>}
      </Split>
    );
  };

  const renderLayout = () => {
    return options ? (options.horizontal ? renderTopBottomSplit() : renderLeftRightSplit()) : renderActions();
  };

  return <Root>{renderLayout()}</Root>;
};
