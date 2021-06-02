import React, {useState, useContext, createContext} from 'react'
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	HttpLink,
	gql,
} from '@apollo/client'
import Cookies from 'js-cookie'

const authContext = createContext()

export function AuthProvider({children}) {
	const auth = useProvideAuth()

	return (
		<authContext.Provider value={auth}>
			<ApolloProvider client={auth.createApolloClient()}>
				{children}
			</ApolloProvider>
		</authContext.Provider>
	)
}


export const useAuth = () => {
	return useContext(authContext)
}


function useProvideAuth() {
	const [authToken, setAuthToken] = useState(Cookies.get('token'))

	const getAuthHeaders = () => {
		if(!authToken) return null

		return {
			authorization: `Bearer ${authToken}`,
		}
	}

	function createApolloClient(){
		const link = new HttpLink({
			uri: 'http://localhost:4001/graphql',
			headers: getAuthHeaders(),
		})

		return new ApolloClient({
			link,
			cache: new InMemoryCache(),
		})
	}

	const signOut = () => {
		Cookies.remove('token')
		setAuthToken(null)
	}

	const signIn = async ({email, password}) => {
		const client = createApolloClient()
		const LoginMutation = gql`
			mutation LoginMutation($email: String!, $password: String!){
				login(email: $email, password: $password){
					token
				}
			}
		`
		const result = await client.mutate({
			mutation: LoginMutation,
			variables: {email, password},
		})

		console.log(result)

		if(result?.data?.login?.token){
			Cookies.set('token', result.data.login.token, {expires: 10})
			setAuthToken(result.data.login.token)
		}
	}
	const isSignedIn = () => {
		if(authToken){
			return true
		} else {
			return false
		}
	}

	return {
		createApolloClient,
		signIn,
		signOut,
		isSignedIn,
	}
}
