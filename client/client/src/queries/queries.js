import { gql } from "apollo-boost";



// const getUsersQuery = gql`
//  {
//      users{
//          id
//          username
//          password
//          role
//      }
//  }
// `
const getUserQuery = gql`  
query($id: ID){
    user(id: $id){
        id,
        name,
        password,
        role
    }
}
`
const getProjectsQuery = gql`
  {
      projects{
          id
          name
          owner{
              id
          }
          status
      }
  }
`

// const getQuestionsQuery = gql`
// `

//Using query variables to get the values in the fields 
// from the updated state in the component

const userMutation = gql` 
mutation($username :String! ,$password :String! , $role :String!){
    addBook(username :$username ,password :$password , role :$role ){
       username,
       password,
       role
    }
}
`

// const addProjectMutation = gql` 

// `

// const addQuestionMutation = gql` 

// `
export {
    getUserQuery,
    getProjectsQuery,
    // getQuestionsQuery,
    // addProjectMutation,
    userMutation,
    // addQuestionMutation
}