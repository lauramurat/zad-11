const { ApolloServer, gql } = require('apollo-server');
const { faker } = require('@faker-js/faker');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User]!
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User
    }
`;

const generateMockUsers = () => {
    const users = [];
    for (let i = 0; i < 10; i++) {
        users.push({
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            email: faker.internet.email(),
        });
    }
    return users;
};

const resolvers = {
    Query: {
        users: () => generateMockUsers(),
    },
    Mutation: {
        createUser: (_, { name, email, password }) => {
            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }
            try {
                return {
                    id: faker.datatype.uuid(),
                    name: name,
                    email: email
                };
            } catch (error) {
                console.error("Error creating user:", error);
                throw new Error("Failed to create user");
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: false
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
