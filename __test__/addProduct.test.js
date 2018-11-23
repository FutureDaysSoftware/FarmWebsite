const gql = require('graphql-tag');
const { AWSAppSyncClient } = require('aws-appsync');
const {
  create,
  connect,
} = require('@conduitvc/appsync-emulator-serverless/tester');

// required by apollo-client
global.fetch = require('node-fetch');

describe('add product', () => {
  let server;
  let client;

  const addProduct = async () => {
    const result = await client.mutate({
      mutation: gql`
        mutation addProduct($input: ProductInput!) {
          addProduct(input: $input) {
            id
            createDate
            name
          }
        }
      `,
      variables: {
        input: {
          name: 'Cheese',
          quantity: 1,
        },
      },
    });
    return result;
  };

  beforeEach(async () => {
    server = await create({ serverless: `${__dirname}/..` });
    client = connect(
      server,
      AWSAppSyncClient
    );
  });

  afterEach(async () => server.close());

  it('adds a product', async () => {
    const result = await addProduct();
    expect(result.data.addProduct.name).toEqual('Cheese');
  });
});
