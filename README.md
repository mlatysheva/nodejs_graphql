## Assignment: Graphql
### Tasks:
1. Add logic to the restful endpoints (users, posts, profiles, member-types folders in ./src/routes).  
   1.1. npm run test - 100%  
2. Add logic to the graphql endpoint (graphql folder in ./src/routes).  
Constraints and logic for gql queries should be done based on restful implementation.  
For each subtask provide an example of POST body in the PR.  
All dynamic values should be sent via "variables" field.  
If the properties of the entity are not specified, then return the id of it.  
`userSubscribedTo` - these are users that the current user is following.  
`subscribedToUser` - these are users who are following the current user.  


Task 2: GraphQL
- Make post requests via Postman to: http://127.0.0.1:3000/graphql 
- Get users, profiles, posts, memberTypes - 4 operations in one query. 
Body of the Postman request:
```
query GetAllEntities {
    users {id},
    profiles {id},
    posts {id},
    memberTypes {id}
}
```
- Get user, profile, post, memberType by id - 4 operations in one query.  
Body of Postman request:
```
query GetEntityByID($userId: ID!, $profileId: ID!, $postId: ID!, $memberTypeId: ID!) {
    user(id: $userId) {id}
    profile(id: $profileId) {id}
    post(id: $postId) {id}
    memberType(id: $memberTypeId) {id}
}
```
Variables: 
```
{
    "userId": [enter id of a recently added user],
    "profileId": [enter id of a recently added profile],
    "postId": [enter id of a recently added post],
    "memberTypeId": "basic"
}
```

- Get users with their posts, profiles, memberTypes.  
Body of Postman request:
```
query GetUsersWithProfilePostsMember {
    users {
        id
        profile {
            id
        }
       posts {
            id
        }
        memberType {
            id
        }
    }
}
```

- Get user by id with his profile, posts, memberType.
Body of Postman request:
```
query GetUserWithProfilePostMember($id: ID!) {
    user(id: $id) {
        id
       lastName
       profile {
            id
        }
        posts {
            id
        }        
        memberType {
            id
        }
    }
}
```
Variables: 
```
{
    "id": [enter id of a recently added user]
}
```
- Get users with their `userSubscribedTo`, profile.  
Body of Postman request:
```
query GetUsersWithProfileUserSubscribedTo {
    users {
        id
        profile {
            id
        }
        userSubscribedTo {
            id
        }
    }
}
```
- Get user by id with his `subscribedToUser`, posts. 
Body of Postman request: 
```
query GetUserWithSubscribedToUserPosts($id: ID!) {
    user(id: $id) {
        id
        subscribedToUser {id}
        posts {id}
    }
}
```
Variables:
```
{
    "id": [enter id of a recently added user]
}
```
Get users with their `userSubscribedTo`, `subscribedToUser` (additionally for each user in `userSubscribedTo`, `subscribedToUser` add their `userSubscribedTo`, `subscribedToUser`).  

- Create user.  
Body of the Postman request:
```
mutation createUser($input: createUserDTO!) {
    createUser(input: $input) {
        id
        firstName
        lastName
        email
    }
}
```
Variables:
```
{
    "input": {
        "firstName": "Vasissualiy",
        "lastName": "Lokhankin",
        "email": "vasya@lokhankin.it"
    }
}
```
- Create profile.  
   Body of the Postman request:
```
mutation CreateProfile($input: createProfileDTO!) {
    createProfile(input: $input) {
        id
        avatar
        sex
        birthday
        country
        city
        street
        memberTypeId
        userId
    }
}
```
Variables:
```
{ 
  "input": {
    "userId":[enter id of a recently added user],
    "avatar": "photo",
    "sex": "male",
    "birthday": 12342908,
    "country": "Russia",
    "street": "Tverskaya",
    "city": "Moscow",
    "memberTypeId": "basic"
   }
}
```
- Create post.  
   Body of the Postman request:
```
mutation CreatePost($input: createPostDTO!) {
    createPost(input: $input) {
        id,
        title,
        content,
        userId,
    }
}
```
Variables:
```
{
    "input": {
        "userId": [enter id of a recently added user],
        "title": "My love to GraphQL",
        "content": "How my brain exploded"
    }
}
```
- Update user.  
Body of Postman request:
```
mutation UpdateUser($input: updateUserDTO!, $id: ID!) {
    updateUser(id: $id, input: $input) {
        id
        firstName
        lastName
        email
    }
}
```
Variables:
```
{
    "id": [enter id of a recently added user],
    "input": {
        "firstName": "VasissualiyNew",
        "lastName": "LokhankinNew",
        "email": "vasyaNew@lokhankin.it"
    }
}
```
- Update profile. 
Body of Postman request:
```
mutation UpdateProfile($input: updateProfileDTO!, $id: ID!) {
    updateProfile(id: $id, input: $input) {
        id
        country
    }
}
```
Variables: 
```
{
    "id": [enter id of a recently created profile],
    "input": {
        "country": "Germany",
        "sex": "female"
    }
}
``` 
- Update post. 
Body of Postman request:
```
mutation UpdatePost($input: updatePostDTO!, $id: ID!) {
    updatePost(id: $id, input: $input) {
        id
        title
    }
}
```
Variables:
```
{
    "id": [Enter id of a recently created post],
    "input": {
        "title": "New title",
        "content": "New content"
    }
}
``` 
- Update memberType.  
Body of Postman request:
```
mutation UpdateMemberType($input: updateMemberTypeDTO!, $id: String!) {
    updateMemberType(id: $id, input: $input) {
        id
        discount
        monthPostsLimit
    }
}
```
Variables:
```
{
    "id": "business",
    "input": {
        "discount": 54
    }
}
```
