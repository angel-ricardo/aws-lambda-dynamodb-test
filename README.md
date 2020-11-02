# AWS Lambda and DynamoDB CRUD Example
Test AWS lambda/dynamodb CRUD operations locally using [localstack]

## About
This repo contains sample use cases for CRUD operations in dynamodb, there are four lambda functions, one per each use case. 
I made my try to implement domain-driven-design architecture.

### Why?
I'm just trying to create a template for lambda services, using nodejs and testing basic DB operations.

### Code and Testing
AWS Lambda and DynamoDB uses javascript [aws-skd]. 
All app code is typescript base code and then built into javascript code, zip packaged and then uploaded to localstack lambda service.
For testing pourposes I added some mock dependencies, these include [sinon.js] and [aws-sdk-mock] in order to simulate unit and integration tests, 
and using [localstack] to create e2e tests.

I chose [Mocha] as test framework and [Chai] as assertion library. Finally, I created a github action workflow for master branch PR.

[](#project-status)
## Project status
This project is just a test, It may not receive more updates after this.

## Coding guidelines
Intention is to follow DDD structure, so because this is the very first time I've tryied this architecture it might not be good enough. 
Nevertheless, given the scope of the project (use this template for other projects) I decided to use prettier as code formater.

## Setup
### Requirements
This project was developed and tested under the following:
* [AWS CLI V2]
* [Docker] (19.03.13) and [docker-compose] (1.27.4)
* [Nodejs] (v12.19.0)
* [Typescript] (4.0.3)
* [Git Bash] (for windows users, there are some scripts that need sh to run)

### Get Started
Configure aws cli profile:
``aws configure``

You don't need to provide your real credentials when using localstack, see following example:
```
AWS Access Key ID    : 1
AWS Secret Access Key: 1
Default region name  : us-east-1
Default output format: json
```

Following the workflow below you'll be able to run tests locally

1. Move to project folder: ``cd path-to-project``
2. Run tests ``npm test``, this executes test (no localstack is needed)
3. Run ``npm run serve``, this is going to start localstack (this executes docker-compose, so make sure docker is running)
4. Once localstack is ready, run: ``npm run setup``, this compile project code and upload it to localstack
5. Run e2e tests ``npm run e2e``

### Adding new components
If you want to add some code or use case, you should follow this order:
1. Create/update domain components.
    1. Value Objects
    2. Entities
    3. Unit/Integration Tests
2. Create/update domain interface.
    1. Interface Repository in domain layer
    2. Update Repository implementation (Do this if the interface already exists and was updated, this prevent breaking existing tests)
3. Create/update application components.
    1. Application Component (like UserCreator, UserFinder, etc...), this is the use case you want to code
    2. Unit/Integration Tests
4. Create/update infraestructure components.
    1. Create Lambda Function handler and it's corresponding Request and Response types
    2. Add Lambda Function definition in ``aws/cloudformation.yaml``
    3. Add Lambda Function name in ``aws/update-lambda-code.sh``
5. Create/update e2e test
    1. Create your test like this ``aws/e2e/lambda/example.test.ts``
    2. Update test index: ``aws/e2e/lambda/index.spec.ts``
    
    **Why e2e tests have a different file extension than unit/integration?** 
    Unit/Integration tests ends with ``.spec.ts`` because they don't need to follow an execution order, however, in e2e tests 
    you must need to follow a specific test order (just think what happend if you executes the finder function before the create function, 
    item will not exist in db and finder function will fail), 
    so that's the reason this template uses ``.test.ts`` in order to not execute 
    directly these tests, instead, we define ``index.spec.ts`` to specify the order e2e tests must run.
    
    If you wish, you could refer to ``package.json`` and see **e2e** script, you'll notice that this script makes Mocha only run ``.spec.ts`` files

### Testing
* You can run Unit/Integration tests whenever you want, just run: ``npm test``
* If you want to test e2e, these are the steps:
    * Run docker
    * Run localstack: ``npm run serve``
    * Upload the code to localstack: ``npm run setup``
    * Execute e2e tests: ``npm run e2e``
* If you update your code, and you didn't close the localstack server, it's not needed to re-run all the previous steps, 
insted just run: ``npm run update``. This will update the lambda code without having to restart/setup localstack, and then 
run e2e ``npm run e2e``.
    
### Package.json Scripts
To run make: ``npm run <script-name>``
* **test**: Execute Unit and Integration Tests
* **e2e**: Execute E2E Tests (this require localstack to be running and cloudformation stack uploaded)
* **build**: Build code and generates ``built.zip``
* **serve**: Runs LocalStack container
* **setup**: Setup localstack with cloudformation stack. See ``aws/cloudformation.yaml`` for stack details
* **update**: Updates lambda code without having to restart localstack and setup again
* **format**: Format code using prettier (this may be skipped, husky execute this format when git commit is made)

## Contributions
Currently the project is NOT ACCEPTING CODE CONTRIBUTIONS (pull requests, or else). Refer to [Project Status](#project-status)

[localstack]: <https://github.com/localstack/localstack>
[aws-skd]: <https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html>
[sinon.js]: <https://sinonjs.org/>
[aws-sdk-mock]: <https://github.com/dwyl/aws-sdk-mock>
[Mocha]: <https://mochajs.org/>
[Chai]: <https://www.chaijs.com/>
[Docker]: <https://www.docker.com/>
[docker-compose]: <https://docs.docker.com/compose/>
[Nodejs]: <https://nodejs.org/es/>
[Typescript]: <https://www.typescriptlang.org/>
[Git Bash]: <https://git-scm.com/>
[AWS CLI V2]: <https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html>