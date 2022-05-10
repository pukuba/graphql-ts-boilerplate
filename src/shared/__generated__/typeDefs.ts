const typeDefs = `

directive @cacheControl(inheritMaxAge: Boolean, maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | INTERFACE | OBJECT | UNION

directive @isAuthenticated on FIELD_DEFINITION

directive @rateLimit(key: String!, limit: UnsignedInt!, time: UnsignedInt!) on FIELD_DEFINITION

type AuthorizationError implements Error {
  message: String!
  path: String!
}

enum CacheControlScope {
  PRIVATE
  PUBLIC
}

scalar DateTime

type DuplicateEmailError implements Error {
  message: String!
  path: String!
  suggestion: String!
}

scalar EmailAddress

interface Error {
  message: String!
  path: String!
}

type File {
  encoding: String!
  filename: String!
  mimetype: String!
}

input HealthCheckInput {
  data: String!
}

type InvalidAccountError implements Error {
  message: String!
  path: String!
  suggestion: String!
}

union IsAuthorizedPayload = AuthorizationError | User

scalar JWT

type LoginInfo {
  token: JWT!
  user: User!
}

input LoginInput {
  email: EmailAddress!
  password: String!
}

union LoginPayload = InvalidAccountError | LoginInfo | RateLimitError

union LogoutPayload = AuthorizationError | User

type Mutation {
  healthCheck(input: HealthCheckInput!): String!
  login(input: LoginInput!): LoginPayload!
  logout: LogoutPayload!
  register(input: RegisterInput!): RegisterPayload!
}

type Query {
  healthLive: DateTime!
  isAuthorized: IsAuthorizedPayload!
}

type RateLimitError implements Error {
  message: String!
  path: String!
  ttl: UnsignedInt!
}

input RegisterInput {
  email: EmailAddress!
  password: String!
}

union RegisterPayload = DuplicateEmailError | User

scalar UnsignedInt

scalar Upload

type User {
  createdAt: DateTime!
  email: EmailAddress!
  updatedAt: DateTime!
}
`
export default typeDefs
