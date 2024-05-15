// External Dependencies
import fs from "fs";
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from "@apollo/subgraph";
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';

// Internal Dependencies
const typeDefs = gql(fs.readFileSync("./orders.graphql", 'utf8'));
import { orders } from "./data/orders.js";

// Variable Definitions
const port = process.env.PORT || 4004

const resolvers = {
    User: {
        orders(user) {
            return orders.filter((order) => order.userId === parseInt(user.id));
        }
    },
    Order: {
        products(order) {
            return order.products.map((product) => ({ __typename: "Product", id: product }));
        },
        user(order) {
            return { __typename: "User", id: order.userId };
        }
    },
    Query: {
        order(_, { id }) {
            return orders.find((order) => order.id === parseInt(id, 10));
        },
        orders() {
            return orders
        }
    }
};

// Apollo Server Setup
const server = new ApolloServer({ 
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: port },
  });

console.log(`🚀  Prices Subgraph ready at ${url}`);
