/* eslint-disable */
type FirstTypeResolveFnParams<T> = T extends TypeResolveFn<infer U, infer V, infer W> ? U : never;
export type NodeResolveType = FirstTypeResolveFnParams<NodeResolvers['__resolveType']>;

import { GraphQLResolveInfo } from 'graphql';
import { UserEntity } from '~/shared/entity/user.entity';
import { ArticleEntity } from '~/shared/entity/article.entity';
import { ApolloContext } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Article = Node & {
  __typename?: 'Article';
  /** 내용 */
  content: Scalars['String'];
  /** 작성자 */
  creator: Scalars['String'];
  /** 아티클 아이디 */
  externalId: Scalars['String'];
  id: Scalars['ID'];
  /** 제목 */
  title: Scalars['String'];
};

export type CreateArticleInput = {
  /** 내용 */
  content: Scalars['String'];
  /** 제목 */
  title: Scalars['String'];
  /** 작성자 */
  userId: Scalars['String'];
};

export type CreateArticleOutput = Article | Error;

export type CreateUserInput = {
  /** 유저의 아이디 */
  id: Scalars['String'];
  /** 유저의 비밀번호 */
  password: Scalars['String'];
};

export type CreateUserOutput = Error | User;

export type DeleteArticleInput = {
  /** 아티클 아이디 */
  id: Scalars['String'];
};

export type DeleteArticleOutput = Article | Error;

export type DeleteUserInput = {
  /** 유저의 아이디 */
  id: Scalars['String'];
};

export type DeleteUserOutput = Error | User;

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 아티클 생성 */
  createArticle: CreateArticleOutput;
  /** 유저를 생성하는 뮤테이션 */
  createUser: CreateUserOutput;
  /** 아티클 삭제 */
  deleteArticle: DeleteArticleOutput;
  /** 유저를 삭제하는 뮤테이션 */
  deleteUser: DeleteUserOutput;
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteArticleArgs = {
  input: DeleteArticleInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};

export type Node = {
  /** 스키마에서 유일한 ID 값 */
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /** 서버의 현재 시간을 반환하는 쿼리 */
  live: Scalars['String'];
  /** ID갑으로 Object가져오기 */
  node?: Maybe<Node>;
  /** 항상 true를 반환하는 ping 쿼리 */
  ping: Scalars['Boolean'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type User = Node & {
  __typename?: 'User';
  /** 유저 아이디 */
  externalId: Scalars['String'];
  id: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Article: ResolverTypeWrapper<ArticleEntity>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateArticleInput: CreateArticleInput;
  CreateArticleOutput: ResolversTypes['Article'] | ResolversTypes['Error'];
  CreateUserInput: CreateUserInput;
  CreateUserOutput: ResolversTypes['Error'] | ResolversTypes['User'];
  DeleteArticleInput: DeleteArticleInput;
  DeleteArticleOutput: ResolversTypes['Article'] | ResolversTypes['Error'];
  DeleteUserInput: DeleteUserInput;
  DeleteUserOutput: ResolversTypes['Error'] | ResolversTypes['User'];
  Error: ResolverTypeWrapper<Error>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Article'] | ResolversTypes['User'];
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<UserEntity>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Article: ArticleEntity;
  Boolean: Scalars['Boolean'];
  CreateArticleInput: CreateArticleInput;
  CreateArticleOutput: ResolversParentTypes['Article'] | ResolversParentTypes['Error'];
  CreateUserInput: CreateUserInput;
  CreateUserOutput: ResolversParentTypes['Error'] | ResolversParentTypes['User'];
  DeleteArticleInput: DeleteArticleInput;
  DeleteArticleOutput: ResolversParentTypes['Article'] | ResolversParentTypes['Error'];
  DeleteUserInput: DeleteUserInput;
  DeleteUserOutput: ResolversParentTypes['Error'] | ResolversParentTypes['User'];
  Error: Error;
  ID: Scalars['ID'];
  Mutation: {};
  Node: ResolversParentTypes['Article'] | ResolversParentTypes['User'];
  Query: {};
  String: Scalars['String'];
  User: UserEntity;
};

export type ArticleResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateArticleOutputResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['CreateArticleOutput'] = ResolversParentTypes['CreateArticleOutput']> = {
  __resolveType: TypeResolveFn<'Article' | 'Error', ParentType, ContextType>;
};

export type CreateUserOutputResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['CreateUserOutput'] = ResolversParentTypes['CreateUserOutput']> = {
  __resolveType: TypeResolveFn<'Error' | 'User', ParentType, ContextType>;
};

export type DeleteArticleOutputResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['DeleteArticleOutput'] = ResolversParentTypes['DeleteArticleOutput']> = {
  __resolveType: TypeResolveFn<'Article' | 'Error', ParentType, ContextType>;
};

export type DeleteUserOutputResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['DeleteUserOutput'] = ResolversParentTypes['DeleteUserOutput']> = {
  __resolveType: TypeResolveFn<'Error' | 'User', ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createArticle?: Resolver<ResolversTypes['CreateArticleOutput'], ParentType, ContextType, RequireFields<MutationCreateArticleArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['CreateUserOutput'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteArticle?: Resolver<ResolversTypes['DeleteArticleOutput'], ParentType, ContextType, RequireFields<MutationDeleteArticleArgs, 'input'>>;
  deleteUser?: Resolver<ResolversTypes['DeleteUserOutput'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'input'>>;
};

export type NodeResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Article' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  live?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  ping?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  externalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  Article?: ArticleResolvers<ContextType>;
  CreateArticleOutput?: CreateArticleOutputResolvers<ContextType>;
  CreateUserOutput?: CreateUserOutputResolvers<ContextType>;
  DeleteArticleOutput?: DeleteArticleOutputResolvers<ContextType>;
  DeleteUserOutput?: DeleteUserOutputResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

