const typeDefs = `

directive @rateLimit(key: String!, limit: Int!, time: Int!) on FIELD_DEFINITION

type Query {
  """서버의 현재 시간을 반환하는 쿼리"""
  live: String!

  """항상 true를 반환하는 ping 쿼리"""
  ping: Boolean!
}
`
export default typeDefs
