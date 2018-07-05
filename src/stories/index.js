import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import ChatBot from 'react-simple-chatbot';

storiesOf('Designs', module).add('Chat-Bot', () => {
  let chat;
  const triggerInput = (inputValue, step) => () => {
    setTimeout(() => chat.setState({ inputValue }), 1000);
    return step;
  };
  const story = (
    <ChatBot
      headerTitle="Cloud App Creator"
      ref={node => (chat = node)}
      width="600px"
      steps={[
        {
          id: 'welcome',
          message: 'What can I offer you today?',
          trigger: triggerInput(
            'I want to make a new messaging application',
            'user-start'
          )
        },
        {
          id: 'user-start',
          user: true,
          trigger: 'create-message-broker'
        },
        {
          id: 'create-message-broker',
          message:
            "OK, we'll set you up with something called a message broker, and this is provided by Red Hat AMQ. Would you like new messages sent here to be handled by one listener (Queue) or broadcast to many (Topic)",
          trigger: 'user-create-message-broker-queue-or-topic'
        },
        {
          id: 'user-create-message-broker-queue-or-topic',
          options: [
            {
              value: 1,
              label: 'Queue',
              trigger: 'create-message-broker-sorry-queue'
            },
            { value: 2, label: 'Topic', trigger: 'create-message-broker-topic' }
          ]
        },
        {
          id: 'create-message-broker-sorry-queue',
          message: "For the Demo... I'll assume you want a Topic then.",
          trigger: 'create-message-broker-topic'
        },
        {
          id: 'create-message-broker-topic',
          message:
            'No problem; what name would you like to give this Topic?  An example might look like myApplication/greetings',
          trigger: triggerInput(
            'newsserver/newsalert',
            'user-create-message-broker-topic-name'
          )
        },
        {
          id: 'user-create-message-broker-topic-name',
          user: true,
          trigger: 'create-message-broker-listeners'
        },
        {
          id: 'create-message-broker-listeners',
          message:
            "Great; we'll set that up for you.  Would you like to set up message listeners now?  These are the application pieces which receive a message and may take some action.",
          trigger: 'user-create-message-broker-listeners-yes-no'
        },
        {
          id: 'user-create-message-broker-listeners-yes-no',
          options: [
            {
              value: 1,
              label: 'Yes',
              trigger: 'create-message-broker-listeners-frameworks'
            },
            {
              value: 2,
              label: 'No',
              trigger: 'create-message-broker-listeners-sorry'
            }
          ]
        },
        {
          id: 'create-message-broker-listeners-sorry',
          message: "For the Demo, I'll assume you want listeners.",
          trigger: 'create-message-broker-listeners-frameworks'
        },
        {
          id: 'create-message-broker-listeners-frameworks',
          message:
            'Message listeners may be implemented in a variety of languages, frameworks, and runtimes.  Which would you like to use?',
          trigger: 'user-create-message-broker-listeners-frameworks'
        },
        {
          id: 'user-create-message-broker-listeners-frameworks',
          options: [
            { value: 'Vert.x', label: 'Vert.x', trigger: 'add-service' },
            { value: 'NodeJS', label: 'NodeJS', trigger: 'add-service' },
            { value: 'Fuse', label: 'Fuse', trigger: 'add-service' },
            { value: 'Spring Boot', label: 'Spring Boot', trigger: 'add-service' },
            { value: 'WildFly Swarm', label: 'WildFly Swarm', trigger: 'add-service' }
          ]
        },
        {
          id: 'add-service',
          message:
            'Wonderful. Would you like to link this new {previousValue} runtime to any services?',
          trigger: 'user-add-service'
        },
        {
          id: 'user-add-service',
          options: [
            { value: 1, label: 'Database', trigger: 'add-database-service' },
            { value: 2, label: 'Cache', trigger: 'add-service-sorry' },
            {
              value: 3,
              label: 'Circuit-Breaker',
              trigger: 'add-service-sorry'
            },
            { value: 4, label: 'Monitoring', trigger: 'add-service-sorry' }
          ]
        },
        {
          id: 'add-service-sorry',
          message: "For the Demo, I'll assume you want a Database.",
          trigger: 'add-database-service'
        },
        {
          id: 'add-database-service',
          message:
            'Do you have a database or would you like us to set one up for you?',
          trigger: 'user-add-database-service-type'
        },
        {
          id: 'user-add-database-service-type',
          options: [
            {
              value: 1,
              label: 'Use my own',
              trigger: 'add-database-service-sorry'
            },
            {
              value: 2,
              label: 'Setup',
              trigger: 'add-database-service-setup'
            }
          ]
        },
        {
          id: 'add-database-service-sorry',
          message: "For the Demo, I'll assume you want to setup the database.",
          trigger: 'add-database-service-setup'
        },
        {
          id: 'add-database-service-setup',
          message: 'Please pick a DB?',
          trigger: 'user-add-database-service-setup-type'
        },
        {
          id: 'user-add-database-service-setup-type',
          options: [
            {
              value: 1,
              label: 'PostgreSQL',
              trigger: 'add-database-service-setup-creds'
            },
            {
              value: 2,
              label: 'MySQL',
              trigger: 'add-database-service-setup-creds'
            },
            {
              value: 3,
              label: 'MongoDB',
              trigger: 'add-database-service-setup-creds'
            }
          ]
        },
        {
          id: 'add-database-service-setup-creds',
          message:
            "Good. We're going to set up a configuration called a ConfigMap which will store your login credentials for the database; these values will be secrets shared by both the runtime and the database so the two may communicate. Provide your desired username/password?",
          trigger: triggerInput(
            'xxxxx/yyyyy',
            'add-database-service-setup-schema'
          )
        },
        {
          id: 'add-database-service-setup-schema',
          message:
            'Got it. Would you like me to guess your schema now? Doing so will set up database tables and allow you to stub out a frontend later for CRUD operations',
          trigger: 'user-add-database-service-setup-schema'
        },
        {
          id: 'user-add-database-service-setup-schema',
          options: [
            {
              value: 1,
              label: 'Yes',
              trigger: 'add-cache-service'
            },
            { value: 2, label: 'No', trigger: 'add-cache-service' }
          ]
        },
        {
          id: 'add-cache-service',
          message:
            "Awesome! Would you like to set up a cache between your database and runtime?  Caching in some cases may drastically improve throughput, though enabling it requires additional resources. For more information, type 'learn more' about caching.",
          trigger: 'user-add-cache-service'
        },
        {
          id: 'user-add-cache-service',
          options: [
            {
              value: 1,
              label: 'Yes',
              trigger: 'add-cache-service-conf'
            },
            { value: 2, label: 'No', trigger: 'add-cache-service-sorry' }
          ]
        },
        {
          id: 'add-cache-service-sorry',
          message: "For the Demo, I'll assume you want a cache.",
          trigger: 'add-cache-service-conf'
        },
        {
          id: 'add-cache-service-conf',
          message:
            "Excellent, we'll set up a cache for you in a Red Hat Data Grid instance. Would you like to set some configuration options?",
          trigger: 'user-add-cache-service-conf'
        },
        {
          id: 'user-add-cache-service-conf',
          options: [
            {
              value: 1,
              label: 'Yes',
              trigger: 'add-cache-service-conf-sorry'
            },
            { value: 2, label: 'No', trigger: 'add-more' }
          ]
        },
        {
          id: 'add-cache-service-conf-sorry',
          message:
            "For the Demo, I'll assume you don't want to configure the cache.",
          trigger: 'add-more'
        },
        {
          id: 'add-more',
          message:
            'Great. Would you like to add more components to your architecture?',
          trigger: triggerInput('Yes, a frontend', 'user-more-component')
        },
        {
          id: 'user-more-component',
          user: true,
          trigger: 'add-frontend-runtime'
        },
        {
          id: 'add-frontend-runtime',
          message: 'Please choose a runtime',
          trigger: 'user-add-frontend-runtime'
        },
        {
          id: 'user-add-frontend-runtime',
          options: [
            { value: 'Vert.x', label: 'Vert.x', trigger: 'add-frontend-scaffold' },
            { value: 'NodeJS', label: 'NodeJS', trigger: 'add-frontend-scaffold' },
            { value: 'Fuse', label: 'Fuse', trigger: 'add-frontend-scaffold' },
            {
              value: 4,
              label: 'Spring Boot',
              trigger: 'add-frontend-scaffold'
            },
            {
              value: 5,
              label: 'WildFly Swarm',
              trigger: 'add-frontend-scaffold'
            }
          ]
        },
        {
          id: 'add-frontend-scaffold',
          message:
            '{previousValue} it is.. Would you like me to scaffold out an interface for users to interact with the DB?',
          trigger: 'user-add-frontend-scaffold'
        },
        {
          id: 'user-add-frontend-scaffold',
          options: [
            { value: 1, label: 'Angular', trigger: 'done' },
            { value: 2, label: 'React', trigger: 'done' },
            { value: 3, label: 'Vue', trigger: 'done' }
          ]
        },
        {
          id: 'done',
          message: 'Done. Anything else?',
          trigger: 'user-build-app'
        },
        {
          id: 'user-build-app',
          options: [
            { value: 1, label: 'Yes please', trigger: 'build-app-sorry' },
            {
              value: 2,
              label: 'No, you can build my app!',
              trigger: 'build-app'
            }
          ]
        },
        {
          id: 'build-app-sorry',
          message: "For the Demo, I'll assume you want to build the app.",
          trigger: 'build-app'
        },
        {
          id: 'build-app',
          message:
            "Ok, let's build it. The system will now inform you of the progress:",
          trigger: 'build-app-1'
        },
        {
          id: 'build-app-1',
          message: 'Creates an AMQ container',
          trigger: 'build-app-2'
        },
        {
          id: 'build-app-2',
          message:
            "Configures AMQ to have one topic named 'newsserver/newsalert'",
          trigger: 'build-app-3'
        },
        {
          id: 'build-app-3',
          message:
            'Creates a Vert.x runtime with stub code to listen on the topic',
          trigger: 'build-app-5'
        },
        {
          id: 'build-app-5',
          message:
            'Sets up a ConfigMap with entries for username/password for the DB',
          trigger: 'build-app-6'
        },
        {
          id: 'build-app-6',
          message: 'Injects the secrets into the DB container for its config',
          trigger: 'build-app-7'
        },
        {
          id: 'build-app-7',
          message:
            'Injects the secrets into the Vert.x container so it may connect to the DB',
          trigger: 'build-app-8'
        },
        {
          id: 'build-app-8',
          message: 'Configures Vert.x with a DB connection to PostgreSQL',
          trigger: 'build-app-9'
        },
        {
          id: 'build-app-9',
          message: 'Stubs code for Vert.x to interact with the DB',
          trigger: 'build-app-10'
        },
        {
          id: 'build-app-10',
          message: 'Creates a Node container for the frontend',
          trigger: 'build-app-11'
        },
        {
          id: 'build-app-11',
          message:
            'Creates an Angular app in the Node codebase with a form reflecting CRUD operations for the DB schema',
          trigger: 'build-app-12'
        },
        {
          id: 'build-app-12',
          message:
            'Creates a form in the frontend to send messages to the topic',
          trigger: 'build-app-13'
        },
        {
          id: 'build-app-13',
          message:
            'Creates a field in the frontend to read messages that have been sent to the topic',
          trigger: 'build-app-14'
        },
        {
          id: 'build-app-14',
          message: 'Pushes generated codebase(s) to Git',
          trigger: 'build-app-15'
        },
        {
          id: 'build-app-15',
          message:
            'He is your app buddy: http://thenewawesomeapp.openshift.com',
          end: true
        }
      ]}
    />
  );
  return story;
});
