import React, { useState } from 'react';
import { useFeedbackContext } from '../feedback/FeedbackContext';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';

// import { useFeedbackContext } from "../feedback/FeedbackContext"

export default function FeedbackForm2() {
  const {
    name,
    setCurrentName,
    comments,
    setCurrentComments,
    doSubmit,
    isSubmitted,
  } = useFeedbackContext();

  return (
    <Box>
      <Heading data-testid="form-header">Your Feedback is Appreciated!</Heading>
      <FormControl>
        <FormLabel data-testid="name-label" htmlFor="name">
          Name
        </FormLabel>
        <Input
          data-testid="name"
          type="text"
          value={name}
          onChange={(event) => setCurrentName(event.target.value)}
        />
        <FormLabel data-testid="comments-label" htmlFor="comments">
          Comments
        </FormLabel>
        <Input
          data-testid="comments"
          type="text"
          value={comments}
          onChange={(event) => setCurrentComments(event.target.value)}
        />
      </FormControl>
      {!isSubmitted ? (
        <Button
          data-testid="submit-btn"
          type="submit"
          onClick={() => doSubmit()}
        >
          Submit
        </Button>
      ) : (
        <Text data-testid="thank-you">Thank you for your feedback!</Text>
      )}
    </Box>
  );
}
