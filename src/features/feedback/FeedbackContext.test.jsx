import React from 'react';
import { act, render } from '@testing-library/react';
import FakeFeedbackRepository from '../../__fixtures__/FakeFeedbackRepository';
import FeedbackProvider, { useFeedbackContext } from './FeedbackContext';

describe.skip('the FeedbackProvider', () => {
  const feedbackRepo = new FakeFeedbackRepository();

  let setCurrentNameHooked;
  let setCurrentCommentsHooked;
  let submitHooked;
  function TestScaffold() {
    const {
      name,
      setCurrentName,
      comments,
      setCurrentComments,
      doSubmit,
      isSubmitted,
    } = useFeedbackContext();

    setCurrentNameHooked = setCurrentName;
    setCurrentCommentsHooked = setCurrentComments;
    submitHooked = doSubmit;

    return (
      <div>
        <div data-testid="name">{`${name}`}</div>
        <div data-testid="comments">{`${comments}`}</div>
        <div data-testid="isSubmitted">{`${isSubmitted}`}</div>
      </div>
    );
  }

  const renderContext = () =>
    render(
      <FeedbackProvider feedbackRepository={feedbackRepo}>
        <TestScaffold />
      </FeedbackProvider>
    );

  const name = (container) => container.getByTestId('name').textContent;
  const comments = (container) => container.getByTestId('comments').textContent;
  const isSubmitted = (container) =>
    container.getByTestId('isSubmitted').textContent;

  describe('the name field', () => {
    it('originally sets the name as blank', () => {
      const container = renderContext();
      expect(name(container)).toBe('');
    });

    it('allows us to set the current name', () => {
      const container = renderContext();
      act(() => {
        setCurrentNameHooked('Bilbo Baggins');
      });
      expect(name(container)).toBe('Bilbo Baggins');
    });
  });

  describe('the comments field', () => {
    it('originally sets the comments as blank', () => {
      const container = renderContext();
      expect(name(container)).toBe('');
    });

    it('allows us to set the current comments', () => {
      const container = renderContext();
      act(() => {
        setCurrentCommentsHooked('Was a hobbit from the Shire.');
      });
      expect(comments(container)).toBe('Was a hobbit from the Shire.');
    });
  });

  it('submits the feedback', () => {
    const container = renderContext();
    act(() => {
      setCurrentNameHooked('Bilbo Baggins');
      setCurrentCommentsHooked('Was a hobbit from the Shire.');
    });

    expect(isSubmitted(container)).toBe('false');

    act(() => {
      submitHooked();
    });

    expect(feedbackRepo.sentFeedback).toStrictEqual([
      {
        name: 'Bilbo Baggins',
        comments: 'Was a hobbit from the Shire.',
      },
    ]);
    expect(isSubmitted(container)).toBe('true');
  });
});
