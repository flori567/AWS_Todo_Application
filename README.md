<!--
title: 'AWS Serverless REST API with DynamoDB store example in Python'
description: 'This example demonstrates how to setup a RESTful Web Service allowing you to create, list, get, update and delete Todos. DynamoDB is used to store the data.'
layout: Doc
framework: v1
platform: AWS
language: Python
authorLink: 'https://github.com/godfreyhobbs'
authorName: 'Godfrey Hobbs'
authorAvatar: 'https://avatars1.githubusercontent.com/u/8434141?v=4&s=140'
-->
# Serverless REST API

This example demonstrates how to setup a [RESTful Web Services](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services) allowing you to create, list, get, update and delete Todos. DynamoDB is used to store the data. This is just an example and of course you could use any data storage as a backend.

## Structure

This service has a separate directory for all the todo operations. For each operation exactly one file exists e.g. `todos/delete.py`. In each of these files there is exactly one function defined.

The serverless.yml file holds information about the necessary AWS Services for this Todo application. This file will be needed in order to deploy the AWS Services with the serverless framework as you can see in the Deploy section.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Setup
First of all, you need to install the serverless framework in order to be able to deploy the AWS Services and AWS Lambda functions.

```bash
npm install -g serverless
```

## Deploy

In order to deploy the endpoint, the DynamoDB and the API Gateway configuration simply run:

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
Serverless: Stack update finished…

Service Information
service: serverless-rest-api-with-dynamodb
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos/{id}
  PUT - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos/{id}
  DELETE - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos/{id}
functions:
  serverless-rest-api-with-dynamodb-dev-update: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-update
  serverless-rest-api-with-dynamodb-dev-get: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-get
  serverless-rest-api-with-dynamodb-dev-list: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-list
  serverless-rest-api-with-dynamodb-dev-create: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-create
  serverless-rest-api-with-dynamodb-dev-delete: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-delete
```

## Usage

You can create, retrieve, update, or delete todos with the following commands:

### Create a Todo

```bash
curl -X POST https://ejb4u226j9.execute-api.us-east-1.amazonaws.com/dev/todos --data '{ "text": "Learn Serverless" }'
```

No output

### List all Todos

```bash
curl https://ejb4u226j9.execute-api.us-east-1.amazonaws.com/dev/todos
```
OR put the URL into your browser and see a list of all todos.

Example output:
```bash
[
  {
    "checked": false,
    "createdAt": "1611407938.0953338",
    "text": "Learn Serverless",
    "id": "8ce3de25-5d7d-11eb-8d09-773e4be3b1d2",
    "updatedAt": "1611407938.0953338"
  },
  {
    "checked": false,
    "createdAt": "1611485758.2071009",
    "text": "IT Methoden Trends Präsentation",
    "id": "bd4cc309-5e32-11eb-9f47-4328a495d5f9",
    "updatedAt": "1611485758.2071009"
  }
]
```

### Get one Todo

```bash
# Replace the <id> part with a real id from your todos table
curl https://ejb4u226j9.execute-api.us-east-1.amazonaws.com/dev/todos/<id>
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT https://ejb4u226j9.execute-api.us-east-1.amazonaws.com/dev/todos/<id> --data '{ "text": "Learn Serverless", "checked": true }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":true,"updatedAt":1479138570824}
```

### Delete a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X DELETE https://ejb4u226j9.execute-api.us-east-1.amazonaws.com/dev/todos/<id>
```

No output

# Credits
This project is adapted from the following GitHub repository: https://github.com/serverless/examples/tree/master/aws-python-rest-api-with-dynamodb
The frontend was implemented all on my own. Moreover, some adjustments were necessary to the Python files. I could not access the Lambda function via the API because of the CORS policy. So I had to add some additional headers to the python responses.
