# Google Pub/Sub NodeJS Example

This repository contains examples of using Google Pub/Sub via NodeJS.

## Usage & Installation

First, create Service Account that can access Google Pub/Sub (ex: Pub/Sub Admin) via Google IAM. You can continue to create new key using that service account and download it.

After you got the key, run this following command to install requirement NodeJS module :
```bash
npm install
```

After NodeJS module successfully installed, copy `.env.example` file into `.env` and fill value for each environment variable.

Then, execute file `subsriber.js` to create new topic and subscription based `.env` configuration. Open new terminal, execute file `publisher.js` to submit single message into your topic and watch first terminal to check if message has been received.

## Additional Information

If you want to transfer message from pubsub into firestore, maybe you check [this repository](https://github.com/cunkz/google-cloud-function-pubsub-to-firestore)