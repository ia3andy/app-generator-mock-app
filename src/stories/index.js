import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ChatBot from 'react-simple-chatbot';

storiesOf('Chat-Bot', module)
  .add('Hello World', () => (<ChatBot
    headerTitle="Cloud App Creator"
    steps={[
      {
        id: 'hello-world',
        message: 'Hello World!',
        end: true,
      },
    ]}
  />));
