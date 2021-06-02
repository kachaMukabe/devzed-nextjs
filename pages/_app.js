import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	HttpLink,
} from '@apollo/client'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../lib/auth.js';
import Header from '../components/Header';

function createApolloClient(){
	const link = new HttpLink({uri: 'http://localhost:4001/graphql'})

	return new ApolloClient({link, cache: new InMemoryCache(),})
}

function MyApp({ Component, pageProps }) {
	return(
		<ChakraProvider>
			<AuthProvider>
				<Header />
				<Component {...pageProps} />
			</AuthProvider>
		</ChakraProvider>
	) }


export default MyApp
