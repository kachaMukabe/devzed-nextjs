import {useQuery, gql} from '@apollo/client'
import { useAuth } from '../lib/auth.js';
import { LinkBox, LinkOverlay,HStack,Heading, Flex,Grid, GridItem, Button, Box, Text, VStack, Container} from '@chakra-ui/react'
import Layout from '../components/Layout';
import NextLink from 'next/Link';

const DeveloperQuery = gql`
{
	developers {
		name
		developerId
		email
		githubusername
	}
}
`

const Developers = ()=>{
	const {data} = useQuery(DeveloperQuery)
	const {isSignedIn} = useAuth()

	const contact = () => {
		console.log("Clicked")
	}

	return (
		<Layout>
			<VStack spacing={4} align="stretch">
				{data?.developers.map(d=>{
					return <LinkBox key={d.developerId} p="5" borderWidth="1px" rounded="md">
						<Box>

						</Box>
						<Grid
							templateColumns="repeat(3, 1fr)"
							gap={4}
						>
							<GridItem colSpan={2}>
								<HStack>
									<Heading size="md" my="2">
										<LinkOverlay href={`/developer/${d.developerId}`}>
											{d.name}
										</LinkOverlay>
									</Heading>
									<Text>@{d.githubusername}</Text>
								</HStack>
								<Text>
									{d.email}
								</Text>
							</GridItem>
							<GridItem colSpan={1}>
								<VStack spacing={1}>
									<Button onClick={contact}>Contact</Button>
									{!isSignedIn() && <Text>Login to recommend</Text>}
									{isSignedIn() && <Button>Recommend</Button>}
								</VStack>
							</GridItem>
						</Grid>
					</LinkBox>
				})}
			</VStack>
		</Layout>
	)
}


export default Developers
