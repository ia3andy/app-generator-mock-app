import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ChatBot from 'react-simple-chatbot';

storiesOf('Chat-Bot', module)
  .add('Hello you', () => (<ChatBot
    headerTitle="Cloud App Creator"
    steps={[
      {
        id: '1',
        message: 'What is your name?',
        trigger: '2',
      },
      {
        id: '2',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        message: 'Hi {previousValue}, nice to meet you!',
        end: true,
      },
    ]}

  />));
