import {Avatar, Button, Heading, Box, Text, HStack, Tag, Grid, GridItem} from '@chakra-ui/react';


const Developer = ({name, email,description, githubusername, languages}) => {
	
	return (
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
					<HStack>
						<Heading as="h4" size="md">
							{name}
						</Heading>
						<Text>@{githubusername}</Text>
					</HStack>
				</GridItem>
				<GridItem colSpan={1} >
					<Button variant="outline">Contact </Button>
				</GridItem>
				<GridItem colSpan={4} >
					<Text>
						{email}
					</Text>
					<Text>
						{description}
					</Text>
				</GridItem>
				<GridItem colSpan={4} >
					<HStack spacing={4}>
						{languages?.map(lang=>(
							<Tag size="lg" key={lang.name} variant="solid">
								{lang.name}
							</Tag>
						))}

					</HStack>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default Developer
