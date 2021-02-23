import * as React from 'react';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import { Main } from './Main';

const Root = styled.div`
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
`;

/**
 * The root user interface of the application.
 */
export const App = () => {
  // This demo leverages recoil for application state management.
  // Recoil is NOT a requirement to use the react-splitter.
  return (
    <Root>
      <RecoilRoot>
        <Main />
      </RecoilRoot>
    </Root>
  );
};
