import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    user: User
    users: [User]!
    product(id: ID!): Product
    products: [Product]!
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthData
    requestResetPassword(email: String!): Message!
    resetPassword(password: String!, token: String!): Message!
    createProduct(
      description: String!
      price: Float!
      imageUrl: String!
    ): Product!
    updateProduct(
      id: ID!
      description: String
      price: Float
      imageUrl: String
    ): Product!
    deleteProduct(id: ID!): Product!
    addToCart(id: ID!): CartItem!
    deleteCart(id: ID!): CartItem!
    createOrder(
      amount: Float!
      cardId: String
      token: String
      return_uri: String
    ): Order
  }

  scalar DateTime

  type User {
    id: ID!
    name: String!
    email: String!
    products: [Product]
    carts: [CartItem]!
    orders: [Order]!
    cards: [Card]!
    createAt: DateTime!
  }

  type Product {
    id: ID!
    description: String!
    price: Float!
    imageUrl: String!
    user: User!
    createAt: DateTime!
  }

  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
    user: User!
    createAt: DateTime!
  }

  type OrderItem {
    id: ID!
    product: Product!
    quantity: Int!
    user: User!
    createAt: DateTime!
  }

  type Order {
    id: ID!
    user: User!
    items: [OrderItem!]!
    authorize_uri: String
    createAt: DateTime!
  }

  type Card {
    id: ID!
    cardInfo: CardInfo
  }

  type CardInfo {
    id: ID!
    expiration_month: Int!
    expiration_year: Int!
    brand: String!
    last_digits: String!
  }

  type AuthData {
    user: User
    jwt: String
  }

  type Message {
    message: String!
  }
`;

export default typeDefs;
