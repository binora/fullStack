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
        category,
        editingAllowed
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


const addQuestionMutation = gql` 
mutation($question :String! ,$answer :String!, $priority :String!,$category :String!){
    addQuestion(question :$question ,answer :$answer ,priority :$priority,category :$category){
       question,
       answer,
       priority,
       category
    }
}
 `
const editQuestionMutation = gql` 
mutation($question :String! ,$answer :String!){
    editQuestion(question :$question ,answer :$answer){
        question,
        answer
    }
}
 `
export {
    loginUserQuery,
    getProjectsQuery,
    getQuestionsQuery,
    getQuestionsQueryUsingToken,
    addQuestionMutation,
    editQuestionMutation
}