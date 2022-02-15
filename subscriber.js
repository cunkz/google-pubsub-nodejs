require('dotenv').config();
// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');

async function runSubscribe(
  projectId = process.env.PROJECT_ID, // Your Google Cloud Platform project ID
  topicName = process.env.TOPIC_NAME, // Name for the new topic to create
  subscriptionName = process.env.SUBCRIPTION_NAME, // Name for the new subscription to create
  keyFilename = process.env.KEY_FILE,
) {
  // Instantiates a client
  const pubsub = new PubSub({projectId, keyFilename });

  let topic = pubsub.topic(topicName);
  const [isTopicExists] = await topic.exists();
  if(!isTopicExists) {
    [topic] = await pubsub.createTopic(topicName);
  }

  let subscription = topic.subscription(subscriptionName);
  const [isSubscriptionExists] = await subscription.exists();
  if(!isSubscriptionExists) {
    [subscription] = await topic.createSubscription(subscriptionName);
  }

  // Receive callbacks for new messages on the subscription
  subscription.on('message', message => {
    console.log('Received message:', message.data.toString());
    // process.exit(0);
  });

  // Receive callbacks for errors on the subscription
  subscription.on('error', error => {
    console.error('Received error:', error);
    process.exit(1);
  });
}

runSubscribe();