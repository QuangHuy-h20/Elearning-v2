import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  category: CourseCategory;
  categoryId: Scalars['String'];
  courseCode: Scalars['String'];
  courseName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  enrollStatus: Scalars['Float'];
  id: Scalars['Float'];
  image: Scalars['String'];
  numberOfStudent: Scalars['Float'];
  textSnippet: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Float'];
  view: Scalars['Float'];
};

export type CourseCategory = {
  __typename?: 'CourseCategory';
  categoryName: Scalars['String'];
  id: Scalars['String'];
};

export type CourseCategoryMutationResponse = IMutationResponse & {
  __typename?: 'CourseCategoryMutationResponse';
  category?: Maybe<CourseCategory>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CourseMutationResponse = IMutationResponse & {
  __typename?: 'CourseMutationResponse';
  code: Scalars['Float'];
  course?: Maybe<Course>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateCourseCategoryInput = {
  categoryName: Scalars['String'];
  id: Scalars['String'];
};

export type CreateCourseInput = {
  categoryId: Scalars['String'];
  courseCode: Scalars['String'];
  courseName: Scalars['String'];
  description: Scalars['String'];
};

export type CreateUserRoleInput = {
  id: Scalars['String'];
  roleName: Scalars['String'];
};

export enum EnrollStatus {
  Enroll = 'enroll',
  UnEnroll = 'unEnroll'
}

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type IMutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserMutationResponse;
  createCategory: CourseCategoryMutationResponse;
  createCourse: CourseMutationResponse;
  createRole: UserRoleMutationResponse;
  deleteCourse: CourseMutationResponse;
  deleteUser: UserMutationResponse;
  enroll: CourseMutationResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserMutationResponse;
  logout: Scalars['Boolean'];
  register: UserMutationResponse;
  singleUpload: Scalars['Boolean'];
  updateCourse: CourseMutationResponse;
  updatedUser: UserMutationResponse;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  createCourseCategoryInput: CreateCourseCategoryInput;
};


export type MutationCreateCourseArgs = {
  createCourseInput: CreateCourseInput;
  file: Scalars['Upload'];
};


export type MutationCreateRoleArgs = {
  createUserRoleInput: CreateUserRoleInput;
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationEnrollArgs = {
  courseId: Scalars['Int'];
  enrollStatusValue: EnrollStatus;
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationUpdateCourseArgs = {
  file: Scalars['Upload'];
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdatedUserArgs = {
  file: Scalars['Upload'];
  updateUserInput: UpdateUserInput;
};

export type PaginatedCourses = {
  __typename?: 'PaginatedCourses';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedCourses: Array<Course>;
  totalCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<CourseCategory>>;
  course?: Maybe<Course>;
  courses?: Maybe<PaginatedCourses>;
  coursesByCategory?: Maybe<Array<Course>>;
  me?: Maybe<User>;
  roles?: Maybe<Array<UserRole>>;
  searchListings?: Maybe<Array<Course>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryCourseArgs = {
  id: Scalars['ID'];
};


export type QueryCoursesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryCoursesByCategoryArgs = {
  categoryId: Scalars['String'];
};


export type QuerySearchListingsArgs = {
  searchInput: SearchInput;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SearchInput = {
  courseCode?: Maybe<Scalars['String']>;
  courseName?: Maybe<Scalars['String']>;
};

export type UpdateCourseInput = {
  categoryId: Scalars['String'];
  courseCode: Scalars['String'];
  courseName: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
};

export type UpdateUserInput = {
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  coursesEnrolledByUser?: Maybe<Array<Course>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  phoneNumber: Scalars['String'];
  profilePicture: Scalars['String'];
  role: UserRole;
  roleId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type UserRole = {
  __typename?: 'UserRole';
  id: Scalars['String'];
  roleName: Scalars['String'];
};

export type UserRoleMutationResponse = IMutationResponse & {
  __typename?: 'UserRoleMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  success: Scalars['Boolean'];
};

export type CourseInfoFragment = { __typename?: 'Course', id: number, courseName: string, courseCode: string, description: string, textSnippet: string, view: number, updatedAt: any, image: string, numberOfStudent: number, enrollStatus: number, userId: number, categoryId: string, user: { __typename?: 'User', username: string } };

export type CourseMutationResponseFragment = { __typename?: 'CourseMutationResponse', code: number, success: boolean, message?: Maybe<string>, course?: Maybe<{ __typename?: 'Course', id: number, courseName: string, courseCode: string, description: string, textSnippet: string, view: number, updatedAt: any, image: string, numberOfStudent: number, enrollStatus: number, userId: number, categoryId: string, user: { __typename?: 'User', username: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> };

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserMutationStatusFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string> };

export type CourseMutationStatusFragment = { __typename?: 'CourseMutationResponse', code: number, success: boolean, message?: Maybe<string> };

export type UserInfoFragment = { __typename?: 'User', id: string, username: string, email: string, roleId: string, phoneNumber: string, profilePicture: string };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, roleId: string, phoneNumber: string, profilePicture: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> };

export type ChangePasswordMutationVariables = Exact<{
  userId: Scalars['String'];
  token: Scalars['String'];
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, roleId: string, phoneNumber: string, profilePicture: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type CreateCourseMutationVariables = Exact<{
  file: Scalars['Upload'];
  createCourseInput: CreateCourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'CourseMutationResponse', code: number, success: boolean, message?: Maybe<string>, course?: Maybe<{ __typename?: 'Course', id: number, courseName: string, courseCode: string, description: string, textSnippet: string, view: number, updatedAt: any, image: string, numberOfStudent: number, enrollStatus: number, userId: number, categoryId: string, user: { __typename?: 'User', username: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type DeleteCourseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCourseMutation = { __typename?: 'Mutation', deleteCourse: { __typename?: 'CourseMutationResponse', code: number, success: boolean, message?: Maybe<string> } };

export type EnrollMutationVariables = Exact<{
  enrollStatusValue: EnrollStatus;
  courseId: Scalars['Int'];
}>;


export type EnrollMutation = { __typename?: 'Mutation', enroll: { __typename?: 'CourseMutationResponse', code: number, success: boolean, message?: Maybe<string>, course?: Maybe<{ __typename?: 'Course', id: number, courseName: string, courseCode: string, description: string, textSnippet: string, view: number, updatedAt: any, image: string, numberOfStudent: number, enrollStatus: number, userId: number, categoryId: string, user: { __typename?: 'User', username: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, roleId: string, phoneNumber: string, profilePicture: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, roleId: string, phoneNumber: string, profilePicture: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type UpdateCourseMutationVariables = Exact<{
  file: Scalars['Upload'];
  updateCourseInput: UpdateCourseInput;
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse: { __typename?: 'CourseMutationResponse', code: number, success: boolean, message?: Maybe<string>, course?: Maybe<{ __typename?: 'Course', id: number, courseName: string, courseCode: string, description: string, textSnippet: string, view: number, updatedAt: any, image: string, numberOfStudent: number, enrollStatus: number, userId: number, categoryId: string, user: { __typename?: 'User', username: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type UpdateUserMutationVariables = Exact<{
  file: Scalars['Upload'];
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updatedUser: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, roleId: string, phoneNumber: string, profilePicture: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', singleUpload: boolean };

export type CourseCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type CourseCategoryQuery = { __typename?: 'Query', categories?: Maybe<Array<{ __typename?: 'CourseCategory', id: string, categoryName: string }>> };

export type CourseQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CourseQuery = { __typename?: 'Query', course?: Maybe<{ __typename?: 'Course', id: number, courseName: string, courseCode: string, description: string, textSnippet: string, view: number, updatedAt: any, image: string, numberOfStudent: number, enrollStatus: number, userId: number, categoryId: string, user: { __typename?: 'User', username: string } }> };

export type CourseIdsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type CourseIdsQuery = { __typename?: 'Query', courses?: Maybe<{ __typename?: 'PaginatedCourses', paginatedCourses: Array<{ __typename?: 'Course', id: number }> }> };

export type CoursesByCategoryQueryVariables = Exact<{
  categoryId: Scalars['String'];
}>;


export type CoursesByCategoryQuery = { __typename?: 'Query', coursesByCategory?: Maybe<Array<{ __typename?: 'Course', id: number, courseName: string, courseCode: string, description: string, textSnippet: string, view: number, updatedAt: any, image: string, numberOfStudent: number, enrollStatus: number, userId: number, categoryId: string, user: { __typename?: 'User', username: string } }>> };

export type CoursesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type CoursesQuery = { __typename?: 'Query', courses?: Maybe<{ __typename?: 'PaginatedCourses', totalCount: number, hasMore: boolean, cursor: any, paginatedCourses: Array<{ __typename?: 'Course', id: number, courseName: string, courseCode: string, description: string, textSnippet: string, view: number, updatedAt: any, image: string, numberOfStudent: number, enrollStatus: number, userId: number, categoryId: string, user: { __typename?: 'User', username: string } }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, roleId: string, phoneNumber: string, profilePicture: string, coursesEnrolledByUser?: Maybe<Array<{ __typename?: 'Course', id: number, courseName: string, courseCode: string, textSnippet: string, view: number, enrollStatus: number, image: string, user: { __typename?: 'User', username: string } }>> }> };

export type SearchQueryVariables = Exact<{
  searchInput: SearchInput;
}>;


export type SearchQuery = { __typename?: 'Query', searchListings?: Maybe<Array<{ __typename?: 'Course', id: number, courseName: string, courseCode: string, textSnippet: string, image: string, view: number, user: { __typename?: 'User', username: string } }>> };

export const CourseMutationStatusFragmentDoc = gql`
    fragment courseMutationStatus on CourseMutationResponse {
  code
  success
  message
}
    `;
export const CourseInfoFragmentDoc = gql`
    fragment courseInfo on Course {
  id
  courseName
  courseCode
  description
  textSnippet
  view
  updatedAt
  image
  numberOfStudent
  enrollStatus
  userId
  categoryId
  user {
    username
  }
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
}
    `;
export const CourseMutationResponseFragmentDoc = gql`
    fragment courseMutationResponse on CourseMutationResponse {
  ...courseMutationStatus
  course {
    ...courseInfo
  }
  errors {
    ...fieldError
  }
}
    ${CourseMutationStatusFragmentDoc}
${CourseInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const UserMutationStatusFragmentDoc = gql`
    fragment userMutationStatus on UserMutationResponse {
  code
  success
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  username
  email
  roleId
  phoneNumber
  profilePicture
}
    `;
export const UserMutationResponseFragmentDoc = gql`
    fragment userMutationResponse on UserMutationResponse {
  ...userMutationStatus
  user {
    ...userInfo
  }
  errors {
    ...fieldError
  }
}
    ${UserMutationStatusFragmentDoc}
${UserInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($userId: String!, $token: String!, $changePasswordInput: ChangePasswordInput!) {
  changePassword(
    userId: $userId
    token: $token
    changePasswordInput: $changePasswordInput
  ) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($file: Upload!, $createCourseInput: CreateCourseInput!) {
  createCourse(file: $file, createCourseInput: $createCourseInput) {
    ...courseMutationResponse
  }
}
    ${CourseMutationResponseFragmentDoc}`;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      file: // value for 'file'
 *      createCourseInput: // value for 'createCourseInput'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($id: ID!) {
  deleteCourse(id: $id) {
    ...courseMutationStatus
  }
}
    ${CourseMutationStatusFragmentDoc}`;
export type DeleteCourseMutationFn = Apollo.MutationFunction<DeleteCourseMutation, DeleteCourseMutationVariables>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseMutation, DeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument, options);
      }
export type DeleteCourseMutationHookResult = ReturnType<typeof useDeleteCourseMutation>;
export type DeleteCourseMutationResult = Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const EnrollDocument = gql`
    mutation Enroll($enrollStatusValue: EnrollStatus!, $courseId: Int!) {
  enroll(enrollStatusValue: $enrollStatusValue, courseId: $courseId) {
    ...courseMutationResponse
  }
}
    ${CourseMutationResponseFragmentDoc}`;
export type EnrollMutationFn = Apollo.MutationFunction<EnrollMutation, EnrollMutationVariables>;

/**
 * __useEnrollMutation__
 *
 * To run a mutation, you first call `useEnrollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollMutation, { data, loading, error }] = useEnrollMutation({
 *   variables: {
 *      enrollStatusValue: // value for 'enrollStatusValue'
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useEnrollMutation(baseOptions?: Apollo.MutationHookOptions<EnrollMutation, EnrollMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnrollMutation, EnrollMutationVariables>(EnrollDocument, options);
      }
export type EnrollMutationHookResult = ReturnType<typeof useEnrollMutation>;
export type EnrollMutationResult = Apollo.MutationResult<EnrollMutation>;
export type EnrollMutationOptions = Apollo.BaseMutationOptions<EnrollMutation, EnrollMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
  forgotPassword(forgotPasswordInput: $forgotPasswordInput)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPasswordInput: // value for 'forgotPasswordInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($file: Upload!, $updateCourseInput: UpdateCourseInput!) {
  updateCourse(file: $file, updateCourseInput: $updateCourseInput) {
    ...courseMutationResponse
  }
}
    ${CourseMutationResponseFragmentDoc}`;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      file: // value for 'file'
 *      updateCourseInput: // value for 'updateCourseInput'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($file: Upload!, $updateUserInput: UpdateUserInput!) {
  updatedUser(updateUserInput: $updateUserInput, file: $file) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      file: // value for 'file'
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UploadFileDocument = gql`
    mutation UploadFile($file: Upload!) {
  singleUpload(file: $file)
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const CourseCategoryDocument = gql`
    query CourseCategory {
  categories {
    id
    categoryName
  }
}
    `;

/**
 * __useCourseCategoryQuery__
 *
 * To run a query within a React component, call `useCourseCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useCourseCategoryQuery(baseOptions?: Apollo.QueryHookOptions<CourseCategoryQuery, CourseCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseCategoryQuery, CourseCategoryQueryVariables>(CourseCategoryDocument, options);
      }
export function useCourseCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseCategoryQuery, CourseCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseCategoryQuery, CourseCategoryQueryVariables>(CourseCategoryDocument, options);
        }
export type CourseCategoryQueryHookResult = ReturnType<typeof useCourseCategoryQuery>;
export type CourseCategoryLazyQueryHookResult = ReturnType<typeof useCourseCategoryLazyQuery>;
export type CourseCategoryQueryResult = Apollo.QueryResult<CourseCategoryQuery, CourseCategoryQueryVariables>;
export const CourseDocument = gql`
    query Course($id: ID!) {
  course(id: $id) {
    ...courseInfo
  }
}
    ${CourseInfoFragmentDoc}`;

/**
 * __useCourseQuery__
 *
 * To run a query within a React component, call `useCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseQuery(baseOptions: Apollo.QueryHookOptions<CourseQuery, CourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
      }
export function useCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
        }
export type CourseQueryHookResult = ReturnType<typeof useCourseQuery>;
export type CourseLazyQueryHookResult = ReturnType<typeof useCourseLazyQuery>;
export type CourseQueryResult = Apollo.QueryResult<CourseQuery, CourseQueryVariables>;
export const CourseIdsDocument = gql`
    query CourseIds($limit: Int!, $cursor: String) {
  courses(limit: $limit, cursor: $cursor) {
    paginatedCourses {
      id
    }
  }
}
    `;

/**
 * __useCourseIdsQuery__
 *
 * To run a query within a React component, call `useCourseIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseIdsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCourseIdsQuery(baseOptions: Apollo.QueryHookOptions<CourseIdsQuery, CourseIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseIdsQuery, CourseIdsQueryVariables>(CourseIdsDocument, options);
      }
export function useCourseIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseIdsQuery, CourseIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseIdsQuery, CourseIdsQueryVariables>(CourseIdsDocument, options);
        }
export type CourseIdsQueryHookResult = ReturnType<typeof useCourseIdsQuery>;
export type CourseIdsLazyQueryHookResult = ReturnType<typeof useCourseIdsLazyQuery>;
export type CourseIdsQueryResult = Apollo.QueryResult<CourseIdsQuery, CourseIdsQueryVariables>;
export const CoursesByCategoryDocument = gql`
    query CoursesByCategory($categoryId: String!) {
  coursesByCategory(categoryId: $categoryId) {
    ...courseInfo
  }
}
    ${CourseInfoFragmentDoc}`;

/**
 * __useCoursesByCategoryQuery__
 *
 * To run a query within a React component, call `useCoursesByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesByCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCoursesByCategoryQuery(baseOptions: Apollo.QueryHookOptions<CoursesByCategoryQuery, CoursesByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursesByCategoryQuery, CoursesByCategoryQueryVariables>(CoursesByCategoryDocument, options);
      }
export function useCoursesByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesByCategoryQuery, CoursesByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursesByCategoryQuery, CoursesByCategoryQueryVariables>(CoursesByCategoryDocument, options);
        }
export type CoursesByCategoryQueryHookResult = ReturnType<typeof useCoursesByCategoryQuery>;
export type CoursesByCategoryLazyQueryHookResult = ReturnType<typeof useCoursesByCategoryLazyQuery>;
export type CoursesByCategoryQueryResult = Apollo.QueryResult<CoursesByCategoryQuery, CoursesByCategoryQueryVariables>;
export const CoursesDocument = gql`
    query Courses($limit: Int!, $cursor: String) {
  courses(limit: $limit, cursor: $cursor) {
    totalCount
    hasMore
    cursor
    paginatedCourses {
      ...courseInfo
    }
  }
}
    ${CourseInfoFragmentDoc}`;

/**
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCoursesQuery(baseOptions: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
    coursesEnrolledByUser {
      id
      courseName
      courseCode
      textSnippet
      view
      enrollStatus
      user {
        username
      }
      image
    }
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchDocument = gql`
    query Search($searchInput: SearchInput!) {
  searchListings(searchInput: $searchInput) {
    id
    courseName
    courseCode
    textSnippet
    image
    user {
      username
    }
    view
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;