import {useQuery, gql} from '@apollo/client'
import { LinkBox, LinkOverlay,Heading, Flex, Box, Text, VStack, Container} from '@chakra-ui/react'
import Layout from '../components/Layout';
import NextLink from 'next/Link';

const DeveloperQuery = gql`
{
	developers {
		name
		developerId
		email
	}
}
`

const Developers = ()=>{
	const {data} = useQuery(DeveloperQuery)

	return (
		<Layout>
			<VStack spacing={4} align="stretch">
				{data?.developers.map(d=>{
					return <LinkBox key={d.developerId} p="5" borderWidth="1px" rounded="md">
						<Box>

						</Box>
						<Heading size="md" my="2">
							<LinkOverlay href={`/developer/${d.developerId}`}>
								{d.name}
							</LinkOverlay>
						</Heading>
						<Text>
							{d.email}
						</Text>
					</LinkBox>
				})}
			</VStack>
		</Layout>
	)
}


export default Developers
