const gql = require('graphql-tag');
const { AWSAppSyncClient } = require('aws-appsync');
const { PriceRequestStateEnum } = require('../src/entities/PriceRequest');
const { create, connect, } = require('@conduitvc/appsync-emulator-serverless/tester');

// required by apollo-client
global.fetch = require('node-fetch');

describe('graphql', () => {
    let server;
    let client;

    const addProduct = () => {
        client.mutate({
            mutation: gql`mutation addProduct($input: ProductInput!) {
                addProduct(input: $input) {
                    id
                    createDate
                    status
                    name
                }
            }`,
            variables: {
                input: {
                    name: 'Cheese',
                },
            },
        });
    }

    beforeEach(async() => {
        server = await create({ serverless: `${__dirname}/..` });
        client = connect(server, AWSAppSyncClient,);
    });

    afterEach(async() => server.close());

    it('mutate', async() => {
        const { data: { addProduct }, } = await addProduct();
    });

    expect(addProduct.name.toEqual('Cheese'));
});
