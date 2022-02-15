require('dotenv').config();
// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');

async function runPublish(
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

  // Send a message to the topic
  const data = {
    id: '4',
    label: 'Delta',
    // _delete: true, // Flag for action delete document in next tutorial
  };
  const stringifyData = JSON.stringify(data);
  const bufferData = Buffer.from(stringifyData);
  await topic.publish(bufferData);
  console.log(stringifyData);
}

runPublish();