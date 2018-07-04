import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import ChatBot from 'react-simple-chatbot';

storiesOf('Chat-Bot', module).add('Hello you', () => {
  let chat;
  const triggerInput = (inputValue, step) => () => {
    setTimeout(() => chat.setState({ inputValue }), 1000);
    return step;
  };
  const story = (
    <ChatBot
      headerTitle="Cloud App Creator"
      ref={node => (chat = node)}
      steps={[
        {
          id: '1',
          message: 'What can I offer you today?',
          trigger: triggerInput('I want to make a new messaging application', 2)
        },
        {
          id: '2',
          user: true,
          trigger: '3'
        },
        {
          id: '3',
          message:
            "OK, we'll set you up with something called a message broker, and this is provided by Red Hat AMQ. Would you like new messages sent here to be handled by one listener (Queue) or broadcast to many (Topic)",
          trigger: '4'
        },
        {
          id: '4',
          options: [
            { value: 1, label: 'Queue', trigger: '5' },
            { value: 2, label: 'Topic', trigger: '6' }
          ]
        },
        {
          id: '5',
          message:
            "Sorry I only support Topic for now... I'll assume you want a Topic then.",
          trigger: '6'
        },
        {
          id: '6',
          message:
            'No problem; what name would you like to give this Topic?  An example might look like myApplication/greetings',
          trigger: triggerInput('newsserver/newsalert', 7)
        },
        {
          id: '7',
          user: true,
          trigger: '8'
        },
        {
          id: '8',
          message:
            "Great; we'll set that up for you.  Would you like to set up message listeners now?  These are the application pieces which receive a message and may take some action.",
          end: true
        }
      ]}
    />
  );
  return story;
});
