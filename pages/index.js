import Head from 'next/head'
import {Text, Flex, Box, Button,Link, Image, Heading, Stack} from '@chakra-ui/react'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
			<Flex
				direction="column"
				align="center"
				maxW={{xl:"1200px"}}
				m="0 auto"
			>
				<Flex
					align="center"
					justify={{base: "center", md: "space-around", xl:"space-between"}}
					direction={{base:"column-reverse", md:"row"}}
					wrap="no-wrap"
					minH="70vh"
					px={8}
					mb={16}
				>
					<Stack
						spacing={4}
						w={{base:"60%", md:"40%"}}
						align={["center", "center", "flex-start","flex-start"]}
					>
						<Heading
							as="h1"
							size="xl"
							fontWeight="bold"
							color="primary.800"
							textAlign={["center", "center", "left", "left"]}
						>
							Developers.Zed
						</Heading>
						<Heading
							as="h2"
							size="md"
							color="primary.800"
							opacity="0.8"
							fontWeight="normal"
							lineHeight={1.5}
							textAlign={["center", "center","left", "left"]}
						>
							Find developers using their recommendations!
						</Heading>
						<Link href="/me">
							<Button
								borderRadius="8px"
								py="4"
								px="4"
								lineHeight="1"
								size="md"
							>
								Sign Up Now
							</Button>
						</Link>
						<Text
							fontSize="xs"
							mt={2}
							textAlign="center"
							color="primary.800"
							opacity="0.6"
						>
							For Developers sign in and start recommending
						</Text>
					</Stack>
					<Box w={{base:"60%", sm:"50%", md: "40%"}}
						mb={{base:12, md:0}}
					>
						<Image src="/images/hero.png" size="100%" rounded="1rem" shadow="2xl" />
					</Box>
				</Flex>
			</Flex>

    </Layout>
  )
}
