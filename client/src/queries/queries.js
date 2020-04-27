import { gql } from "apollo-boost";


const loginUserQuery = gql`
query($username: String, $password: String){
    user(username: $username, password: $password){
        id,
        username,
        role,
        token
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

const getQuestionsQuery = gql`
{
    questions{
        id
        question
        answer
        priority
    }
}
`
const getQuestionsQueryUsingToken = gql`
query($token:String) {
    questions(user_token: $token){
      id
      question,
      answer,
      priority,
      category,
      editingAllowed
    }
  }
`

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
    loginUserQuery,
    getProjectsQuery,
    getQuestionsQuery,
    getQuestionsQueryUsingToken,
    // addProjectMutation,
    userMutation,
    // addQuestionMutation
}