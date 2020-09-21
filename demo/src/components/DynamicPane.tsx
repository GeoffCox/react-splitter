import * as React from "react";
import { LeftRightSplit, TopBottomSplit } from "@geoffcox/react-splitter";
// import { LeftRightSplit } from "../../../package/src/LeftRightSplit";
// import { TopBottomSplit } from "../../../package/src/TopBottomSplit";
import styled, { css, keyframes } from "styled-components";

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
  grid-template-areas: "content";
`;

const DemoActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  outline: none;
  overflow: hidden;
  padding: 20px;
  background: aliceblue;
  margin: auto auto;
`;

const DemoAction = styled.button`
  font-family: "Consolas", "Courier New", Courier, monospace;
  font-size: 10pt;
  min-width: 150px;
  min-height: 25px;
  padding: 5px;
  margin: 5px;
`;

const DemoOption = styled.div`
  padding: 5px;
  margin: 5px;
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
    content: "";
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
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(#1b2735, 0) 0%,
      #090a0f 100%
    );
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
    content: "";
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
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(#1b2735, 0) 0%,
      #090a0f 100%
    );
  }
`;

export const DynamicPane = () => {
  const [split, setSplit] = React.useState<"LR" | "TB" | undefined>(undefined);
  const [customize, setCustomize] = React.useState<boolean>(false);

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
          <DemoAction onClick={() => setSplit("LR")}>Left | Right</DemoAction>
          <DemoAction onClick={() => setSplit("TB")}>Top / Bottom</DemoAction>
          <DemoOption>
            <label>
              <input
                type="checkbox"
                checked={customize}
                onChange={() => setCustomize(!customize)}
              />
              Use custom split
            </label>
          </DemoOption>
        </DemoActions>
      </>
    );
  };

  const renderLR = () => {
    if (customize) {
      return (
        <LeftRightSplit
          initialLeftGridWidth="50%"
          renderSplitter={renderCustomVerticalSplit}
          splitterWidth={10}
        >
          <DynamicPane />
          <DynamicPane />
        </LeftRightSplit>
      );
    } else {
      return (
        <LeftRightSplit initialLeftGridWidth="50%">
          <DynamicPane />
          <DynamicPane />
        </LeftRightSplit>
      );
    }
  };

  const renderTB = () => {
    if (customize) {
      return (
        <TopBottomSplit
          initialTopGridHeight="50%"
          renderSplitter={renderCustomHorizontalSplit}
          splitterHeight={10}
        >
          <DynamicPane />
          <DynamicPane />
        </TopBottomSplit>
      );
    } else {
      return (
        <TopBottomSplit initialTopGridHeight="50%">
          <DynamicPane />
          <DynamicPane />
        </TopBottomSplit>
      );
    }
  };

  const renderLayout = () => {
    switch (split) {
      case "TB":
        return renderTB();
      case "LR":
        return renderLR();
      default:
        return renderActions();
    }
  };

  return <Root>{renderLayout()}</Root>;
};
