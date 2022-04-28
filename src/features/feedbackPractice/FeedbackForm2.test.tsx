import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import FakeFeedbackRepository from '../../__fixtures__/FakeFeedbackRepository';
import FeedbackProvider from '../feedback/FeedbackContext';
import FeedbackForm2 from './FeedbackForm2';

describe('Feedback Form', () => {
  const repo = new FakeFeedbackRepository();

  const renderContainer = () =>
    render(
      <FeedbackProvider feedbackRepository={repo}>
        <FeedbackForm2 />
      </FeedbackProvider>
    );

  describe('Form renders properly', () => {
    it('Should render welcome message', () => {
      const container = renderContainer();
      const formHeader = container.getByTestId('form-header');
      expect(formHeader).toHaveTextContent('Your Feedback is Appreciated!');
    });
    it('Should render name input labels', () => {
      const container = renderContainer();
      const nameLabel = container.getByTestId('name-label');
      expect(nameLabel).toHaveTextContent('Name');
    });
    it('Should render comment input labels', () => {
      const container = renderContainer();
      const commentLabel = container.getByTestId('comments-label');
      expect(commentLabel).toHaveTextContent('Comments');
    });
    it('Should render submit button', () => {
      const container = renderContainer();
      const submitBtn = container.getByTestId('submit-btn');
      expect(submitBtn).toBeVisible();
    });
  });

  describe('Form submits properly', () => {
    it('should submit properly', () => {
      const container = renderContainer();
      const name = container.getByTestId('name');
      const comments = container.getByTestId('comments');
      const submitBtn = container.getByTestId('submit-btn');

      fireEvent.change(name, { target: { value: 'Andrew' } });
      fireEvent.change(comments, {
        target: { value: 'The app is wonderful!' },
      });
      fireEvent.click(submitBtn);
      expect(submitBtn).not.toBeVisible();
      const thankYouMessage = container.getByTestId('thank-you');
      expect(thankYouMessage).toBeVisible();
    });
    it('data should be sent', () => {
      const repo = new FakeFeedbackRepository();

      const container = render(
        <FeedbackProvider feedbackRepository={repo}>
          <FeedbackForm2 />
        </FeedbackProvider>
      );

      const name = container.getByTestId('name');
      const comments = container.getByTestId('comments');
      const submitBtn = container.getByTestId('submit-btn');

      fireEvent.change(name, { target: { value: 'Andrew' } });
      fireEvent.change(comments, {
        target: { value: 'The app is wonderful!' },
      });
      fireEvent.click(submitBtn);

      expect(repo.sentFeedback).toEqual([
        {
          name: 'Andrew',
          comments: 'The app is wonderful!',
        },
      ]);
    });
  });
});
