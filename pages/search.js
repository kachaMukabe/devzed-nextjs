import {HStack, Input, InputGroup, InputRightElement, Select} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import Layout from "../components/layout"


export default function Search() {
	return (
		<Layout>
			<HStack spacing="20px">
				<InputGroup>
					<InputRightElement
						pointerEvents="none"
						children={<SearchIcon color="gray.300" />}
					/>
					<Input placeholder="Search" />
				</InputGroup>
				<Select placeholder="Select one">
					<option value="developers">Developer</option>
					<option value="language">Programing Language</option>
				</Select>
			</HStack>
		</Layout>
	)
}
