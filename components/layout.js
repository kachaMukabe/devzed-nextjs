import { Container } from '@chakra-ui/react'


const Layout = ({children}) => {
	return <Container maxW="container.sm">
		{children}
	</Container>
}

export default Layout

