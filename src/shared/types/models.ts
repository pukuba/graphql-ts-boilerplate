import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  DateTime: any;
  EmailAddress: any;
  JWT: any;
  UnsignedInt: any;
  Upload: any;
};

export type AuthorizationError = Error & {
  __typename?: 'AuthorizationError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type DuplicateEmailError = Error & {
  __typename?: 'DuplicateEmailError';
  message: Scalars['String'];
  path: Scalars['String'];
  suggestion: Scalars['String'];
};

export type Error = {
  message: Scalars['String'];
  path: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type HealthCheckInput = {
  data: Scalars['String'];
};

export type InvalidAccountError = Error & {
  __typename?: 'InvalidAccountError';
  message: Scalars['String'];
  path: Scalars['String'];
  suggestion: Scalars['String'];
};

export type IsAuthorizedPayload = AuthorizationError | User;

export type LoginInfo = {
  __typename?: 'LoginInfo';
  token: Scalars['JWT'];
  user: User;
};

export type LoginInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type LoginPayload = InvalidAccountError | LoginInfo | RateLimitError;

export type LogoutPayload = AuthorizationError | User;

export type Mutation = {
  __typename?: 'Mutation';
  healthCheck: Scalars['String'];
  login: LoginPayload;
  logout: LogoutPayload;
  register: RegisterPayload;
};


export type MutationHealthCheckArgs = {
  input: HealthCheckInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  healthLive: Scalars['DateTime'];
  isAuthorized: IsAuthorizedPayload;
};

export type RateLimitError = Error & {
  __typename?: 'RateLimitError';
  message: Scalars['String'];
  path: Scalars['String'];
  ttl: Scalars['UnsignedInt'];
};

export type RegisterInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type RegisterPayload = DuplicateEmailError | User;

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['EmailAddress'];
  updatedAt: Scalars['DateTime'];
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
  AuthorizationError: ResolverTypeWrapper<AuthorizationError>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CacheControlScope: CacheControlScope;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DuplicateEmailError: ResolverTypeWrapper<DuplicateEmailError>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  Error: ResolversTypes['AuthorizationError'] | ResolversTypes['DuplicateEmailError'] | ResolversTypes['InvalidAccountError'] | ResolversTypes['RateLimitError'];
  File: ResolverTypeWrapper<File>;
  HealthCheckInput: HealthCheckInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InvalidAccountError: ResolverTypeWrapper<InvalidAccountError>;
  IsAuthorizedPayload: ResolversTypes['AuthorizationError'] | ResolversTypes['User'];
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  LoginInfo: ResolverTypeWrapper<LoginInfo>;
  LoginInput: LoginInput;
  LoginPayload: ResolversTypes['InvalidAccountError'] | ResolversTypes['LoginInfo'] | ResolversTypes['RateLimitError'];
  LogoutPayload: ResolversTypes['AuthorizationError'] | ResolversTypes['User'];
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RateLimitError: ResolverTypeWrapper<RateLimitError>;
  RegisterInput: RegisterInput;
  RegisterPayload: ResolversTypes['DuplicateEmailError'] | ResolversTypes['User'];
  String: ResolverTypeWrapper<Scalars['String']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthorizationError: AuthorizationError;
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  DuplicateEmailError: DuplicateEmailError;
  EmailAddress: Scalars['EmailAddress'];
  Error: ResolversParentTypes['AuthorizationError'] | ResolversParentTypes['DuplicateEmailError'] | ResolversParentTypes['InvalidAccountError'] | ResolversParentTypes['RateLimitError'];
  File: File;
  HealthCheckInput: HealthCheckInput;
  Int: Scalars['Int'];
  InvalidAccountError: InvalidAccountError;
  IsAuthorizedPayload: ResolversParentTypes['AuthorizationError'] | ResolversParentTypes['User'];
  JWT: Scalars['JWT'];
  LoginInfo: LoginInfo;
  LoginInput: LoginInput;
  LoginPayload: ResolversParentTypes['InvalidAccountError'] | ResolversParentTypes['LoginInfo'] | ResolversParentTypes['RateLimitError'];
  LogoutPayload: ResolversParentTypes['AuthorizationError'] | ResolversParentTypes['User'];
  Mutation: {};
  Query: {};
  RateLimitError: RateLimitError;
  RegisterInput: RegisterInput;
  RegisterPayload: ResolversParentTypes['DuplicateEmailError'] | ResolversParentTypes['User'];
  String: Scalars['String'];
  UnsignedInt: Scalars['UnsignedInt'];
  Upload: Scalars['Upload'];
  User: User;
};

export type CacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars['Boolean']>;
  maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsAuthenticatedDirectiveArgs = { };

export type IsAuthenticatedDirectiveResolver<Result, Parent, ContextType = any, Args = IsAuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RateLimitDirectiveArgs = {
  key: Scalars['String'];
  limit: Scalars['UnsignedInt'];
  time: Scalars['UnsignedInt'];
};

export type RateLimitDirectiveResolver<Result, Parent, ContextType = any, Args = RateLimitDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthorizationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorizationError'] = ResolversParentTypes['AuthorizationError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DuplicateEmailErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['DuplicateEmailError'] = ResolversParentTypes['DuplicateEmailError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'DuplicateEmailError' | 'InvalidAccountError' | 'RateLimitError', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvalidAccountErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvalidAccountError'] = ResolversParentTypes['InvalidAccountError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IsAuthorizedPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IsAuthorizedPayload'] = ResolversParentTypes['IsAuthorizedPayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'User', ParentType, ContextType>;
};

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export type LoginInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginInfo'] = ResolversParentTypes['LoginInfo']> = {
  token?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = {
  __resolveType: TypeResolveFn<'InvalidAccountError' | 'LoginInfo' | 'RateLimitError', ParentType, ContextType>;
};

export type LogoutPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogoutPayload'] = ResolversParentTypes['LogoutPayload']> = {
  __resolveType: TypeResolveFn<'AuthorizationError' | 'User', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  healthCheck?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationHealthCheckArgs, 'input'>>;
  login?: Resolver<ResolversTypes['LoginPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['LogoutPayload'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['RegisterPayload'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  healthLive?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  isAuthorized?: Resolver<ResolversTypes['IsAuthorizedPayload'], ParentType, ContextType>;
};

export type RateLimitErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RateLimitError'] = ResolversParentTypes['RateLimitError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ttl?: Resolver<ResolversTypes['UnsignedInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterPayload'] = ResolversParentTypes['RegisterPayload']> = {
  __resolveType: TypeResolveFn<'DuplicateEmailError' | 'User', ParentType, ContextType>;
};

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthorizationError?: AuthorizationErrorResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DuplicateEmailError?: DuplicateEmailErrorResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  InvalidAccountError?: InvalidAccountErrorResolvers<ContextType>;
  IsAuthorizedPayload?: IsAuthorizedPayloadResolvers<ContextType>;
  JWT?: GraphQLScalarType;
  LoginInfo?: LoginInfoResolvers<ContextType>;
  LoginPayload?: LoginPayloadResolvers<ContextType>;
  LogoutPayload?: LogoutPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RateLimitError?: RateLimitErrorResolvers<ContextType>;
  RegisterPayload?: RegisterPayloadResolvers<ContextType>;
  UnsignedInt?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>;
  rateLimit?: RateLimitDirectiveResolver<any, any, ContextType>;
};
