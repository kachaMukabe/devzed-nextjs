import {useState, useEffect} from 'react'
import {useQuery, gql} from '@apollo/client'
import { Avatar, Button, Heading, Box, Text,SkeletonText, SkeletonCircle, HStack, Tag, Grid, GridItem} from '@chakra-ui/react'
import { useAuth } from '../lib/auth.js';
import Layout from '../components/Layout';
import LogIn from '../components/login';
import CustomEditable from '../components/customeditable';
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
	const {isSignedIn, signOut} = useAuth()
	const {data} = useQuery(CurrentUserQuery)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [description, setDescription] = useState('')
	const [githubuser, setGithubuser] = useState('')
	
	useEffect(()=>{
		setName(data?.currentUser?.name)
		setEmail(data?.currentUser?.email)
	}, [data])

	if(!data){
		return (
			<Layout>
				<Box padding="6" boxShadow="lg" bg="white">
					<SkeletonCircle size="10" />
					<SkeletonText mt="4" noOfLines={4} spacing="4" />
				</Box>
			</Layout>
		)
	} 

	const save = () => {
		console.log({name, email, description, githubuser})
	}
		
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
					<GridItem colSpan={4} >
						<HStack>
							<Text>Name: </Text>
							<CustomEditable text={data?.currentUser?.name} onEdit={setName}/>
						</HStack>
						<HStack>
							<Text>Email: </Text>
							{data?.currentUser && (<CustomEditable text={data?.currentUser?.email} onEdit={setEmail}/>)}
						</HStack>
					</GridItem>
					<GridItem colSpan={4} >
						<HStack>
							<Text>Github Username: </Text>
							<CustomEditable text="Description her" onEdit={setGithubuser}/>
						</HStack>
						<HStack>
							<Text>Description: </Text>
							<CustomEditable text="Description her" onEdit={setDescription}/>
						</HStack>
					</GridItem>
					<GridItem colSpan={4} >
						<HStack spacing={4}>
							<Button onClick={save}>Save</Button>
							<Button onClick={signOut}>Log out</Button>

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
