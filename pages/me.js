import {useQuery, gql} from '@apollo/client'
import { Avatar, Button, Heading, Box, Text, HStack, Tag, Grid, GridItem} from '@chakra-ui/react'
import { useAuth } from '../lib/auth.js';
import Layout from '../components/Layout';
import LogIn from '../components/login';
import NextLink from 'next/Link';

const CurrentUserQuery = gql`
{
	currentUser {
		name
		developerId
		email
	}
}
`

const Me = () => {
	const {isSignedIn} = useAuth()
	const {data} = useQuery(CurrentUserQuery)
	console.log(data)
		
	return (
		<Layout>
			{!isSignedIn() && <LogIn />}
			{isSignedIn() && 
				<>
			<Box borderWidth="1px" rounded="md" p="5">
				<Grid 
					templateRows="repeat(3, 1fr)"
					templateColumns="repeat(5, 1fr)"
					gap={3}
				>
					<GridItem rowSpan={3} colSpan={1}>
						<Avatar size="lg" name="pic" src="/images/profile.png" />
					</GridItem>
					<GridItem colSpan={3} >
						<Heading as="h4" size="md">
							Name: {data?.currentUser?.name}
						</Heading>
						<Text>
							Email: {data?.currentUser?.email}
						</Text>
					</GridItem>
					<GridItem colSpan={1} >
						<Button variant="outline">Edit</Button>
					</GridItem>
					<GridItem colSpan={4} >
						<Text>
							Description: Description here
						</Text>
					</GridItem>
					<GridItem colSpan={4} >
						<HStack spacing={4}>

						</HStack>
					</GridItem>
				</Grid>
			</Box>
				</>

			}
		</Layout>
	)
}

export default Me
