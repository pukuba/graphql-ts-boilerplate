const typeDefs = `

type Article implements Node {
  """내용"""
  content: String!

  """작성자"""
  creator: String!

  """아티클 아이디"""
  externalId: String!
  id: ID!

  """제목"""
  title: String!
}

input CreateArticleInput {
  """내용"""
  content: String!

  """제목"""
  title: String!

  """작성자"""
  userId: String!
}

union CreateArticleOutput = Article | Error

input CreateUserInput {
  """유저의 아이디"""
  id: String!

  """유저의 비밀번호"""
  password: String!
}

union CreateUserOutput = Error | User

input DeleteArticleInput {
  """아티클 아이디"""
  id: String!
}

union DeleteArticleOutput = Article | Error

input DeleteUserInput {
  """유저의 아이디"""
  id: String!
}

union DeleteUserOutput = Error | User

type Error {
  message: String!
}

type Mutation {
  """아티클 생성"""
  createArticle(input: CreateArticleInput!): CreateArticleOutput!

  """유저를 생성하는 뮤테이션"""
  createUser(input: CreateUserInput!): CreateUserOutput!

  """아티클 삭제"""
  deleteArticle(input: DeleteArticleInput!): DeleteArticleOutput!

  """유저를 삭제하는 뮤테이션"""
  deleteUser(input: DeleteUserInput!): DeleteUserOutput!
}

interface Node {
  """스키마에서 유일한 ID 값"""
  id: ID!
}

type Query {
  """서버의 현재 시간을 반환하는 쿼리"""
  live: String!

  """ID갑으로 Object가져오기"""
  node(id: ID!): Node

  """항상 true를 반환하는 ping 쿼리"""
  ping: Boolean!
}

type User implements Node {
  """유저 아이디"""
  externalId: String!
  id: ID!
}
`
export default typeDefs
