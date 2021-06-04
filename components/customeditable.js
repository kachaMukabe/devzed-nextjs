import { Editable, EditableInput, HStack, useEditableControls,Flex, IconButton, ButtonGroup, EditablePreview } from '@chakra-ui/react'
import {CheckIcon, CloseIcon, EditIcon} from '@chakra-ui/icons'


const CustomEditable = ({text, onEdit}) => {

	function EditableControls() {
		const {
			isEditing,
			getSubmitButtonProps,
			getCancelButtonProps,
			getEditButtonProps,
		} = useEditableControls()

		return isEditing ? (
			<ButtonGroup size="sm">
				<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
				<IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
			</ButtonGroup>
		) : (
			<Flex>
				<IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
			</Flex>
		)
	}

	const submit = (text) => {
		console.log(text)
		onEdit(text)
	}

	return (
		<Editable
			defaultValue={text}
			fontSize="lg"
			isPreviewFocusable={false}
			onSubmit={submit}
		>
			<HStack >

				<EditablePreview />
				<EditableInput />
				<EditableControls />
			</HStack>
		</Editable>

	)
}

export default CustomEditable
