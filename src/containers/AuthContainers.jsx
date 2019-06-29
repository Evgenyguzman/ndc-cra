import { connect } from 'react-redux'
import C from '../store/constants'
import { SignInForm } from '../components/auth/SignInForm';

export const SignInFormContainer = connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    async onSignedIn(login, password, token, name, surname){
      dispatch({
        type: C.SIGN_IN,
        login,
        password,
        token, 
        name,
        surname
      })
    }
  })
)(SignInForm)

// export const SignUpFormContainer = connect(
//   state => ({
    
//   }),
//   dispatch => ({
//     async onSignedUp(){

//     }
//   })
// )(SignUpForm)