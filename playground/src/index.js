import { GraphQLServer } from 'graphql-yoga';

// Scalar Types  = String, Boolean, Int, Float, ID

// type definitions
const typeDefs = `
  type Query {
    greeting(name: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
    me: User!
    post: Post!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello! ${args.name}`;
      }

      return 'Hello';
    },
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }

      return args.numbers.reduce((acc, currentValue) => {
        return (acc += currentValue);
      }, 0);
    },
    grades(parent, args, ctx, info) {
      return [99, 80, 100];
    },
    me() {
      return {
        id: '123456',
        name: 'conary',
        email: 'conary@example.com',
        age: 25,
      };
    },
    post() {
      return {
        id: 'post-1',
        title: 'My first post',
        body: "I'm writing my first post",
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('The Server is running!');
});
