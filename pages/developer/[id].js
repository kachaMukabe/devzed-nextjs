import {useRouter} from 'next/router'
import {useQuery, gql} from '@apollo/client'
import {Avatar, Button, Image,Heading, Flex, Box, Text, Stack,HStack, Tag,Grid, GridItem, Container} from '@chakra-ui/react'
import Link from 'next/link';
import Layout from '../../components/Layout';
import DeveloperCard from '../../components/Developer';

const DeveloperQuery = gql`
query getDeveloper($id: ID!){
	developers(where: {developerId: $id}){
		name
		developerId
		email
		githubusername
		description
		languages{
			name
		}
	}

}
`

const DeveloperPage = () => {

	const router = useRouter()
	const {id} = router.query
	const {data, error} = useQuery(DeveloperQuery, {variables: {id: id}})
	console.log({data, error})
	const developer = data?.developers[0]

	return (
		<Layout>
			{developer? (
				<>
				<DeveloperCard 
					name={developer.name} 
					email={developer.email} 
					description={developer.description}
					githubusername={developer.githubusername}
					languages={developer.languages} 
				/>

					<Heading>
						Recomendations
					</Heading>
				</>

			): <Heading>Loading</Heading>}
		</Layout>
	)
}


export default DeveloperPage
