import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import FeedbackRepository from './data/FeedbackRepository';
import FeedbackProvider from './features/feedback/FeedbackContext';
import FeedbackForm2 from './features/feedbackPractice/FeedbackForm2';
// import FeedbackForm from "./features/feedback/FeedbackForm"

const AppContainer = styled.div`
  text-align: center;
  background: linear-gradient(to right top, #fe7a2c, #fe7a2c, #fde25e);
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  color: white;
  overflow: hidden;
`;

const CenteredAppWithGutters = styled.div`
  width: 100%;
  height: 100%;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <ChakraProvider>
      <AppContainer>
        <CenteredAppWithGutters>
          <FeedbackProvider feedbackRepository={new FeedbackRepository()}>
            {/* <FeedbackForm /> */}
            <FeedbackForm2 />
          </FeedbackProvider>
        </CenteredAppWithGutters>
      </AppContainer>
    </ChakraProvider>
  );
}

export default App;
