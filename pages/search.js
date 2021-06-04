import {useLazyQuery, gql} from '@apollo/client'
import { useAuth } from '../lib/auth.js';
import {useState} from 'react'
import {HStack,LinkBox,Text, LinkOverlay, Heading, Flex, Grid, GridItem, Box, VStack, Container, Input, InputGroup,Button, InputRightElement, Select} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import Layout from "../components/layout"

const DeveloperSearchQuery = gql`
query Search($query: String!){
	developers(where: {name_CONTAINS: $query}){
		name
		developerId
		description
		githubusername
		email
		languages{
			name
		}
	}
}
`

const LanguageSearchQuery = gql`
query Search($query: String!){
	languages(where: {name_CONTAINS: $query}){
		name
	}
}
`

export default function Search() {
	const [getDev, {loading, data}] = useLazyQuery(DeveloperSearchQuery);
	const [query, setQuery] = useState('');
	const {isSignedIn} = useAuth()

	const submit = () => {
		console.log({query})
		getDev({variables:{query:query}})
	}
	const contact = () => {
		console.log("Clicked")
	}
	console.log(data)
	return (
		<Layout>
			<VStack spacing={4}>
				<HStack >
					<InputGroup>
						<InputRightElement
							pointerEvents="none"
							children={<SearchIcon color="gray.300" />}
						/>
						<Input placeholder="Search" onChange={(event)=>setQuery(event.target.value)} />
					</InputGroup>
					<Button onClick={submit}>Search</Button>
				</HStack>
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
