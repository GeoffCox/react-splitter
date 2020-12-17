import * as React from 'react';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import { Main } from './Main';

const Root = styled.div`
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
  font-family: 'Consolas', 'Courier New', Courier, monospace;
  font-size: 10pt;
`;

export const App = () => {
  return (
    <Root>
      <RecoilRoot>
        <Main />
      </RecoilRoot>
    </Root>
  );
};
