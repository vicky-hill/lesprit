import { useState, useEffect } from 'react'
import Form from '@/components/elements/Form'
import Card from '@/components/elements/Card'
import { FormContainer, Heading, Input, SubmitButton } from '@/components/elements/Form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { createList as createListAction } from '@/store/slices/list.slice'
import { FaTimes } from 'react-icons/fa'

interface VocabularyForm {
    onClose: any
}

const VocabularyForm = ({ onClose }: VocabularyForm) => {
    const [title, setTitle] = useState<string>('');
   
    const dispatch = useDispatch<AppDispatch>();
    const createList = (title: string) => dispatch(createListAction({ title }));
    
    useEffect(() => {
        return () => {
            onClose();
        }
    }, []) // eslint-disable-line

    const onChange = (e: any) => {
        setTitle(e.target.value)
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        createList(title);
        setTitle('');
        onClose();
    }

    return (
        <Card type="stitched">
            <FormContainer format="half">
                <Form onSubmit={onSubmit} id="vocabulary-form" >
                    <Heading>Add new list:</Heading>
                    <Input placeholder="List name" name="title" id="title" value={title} onChange={onChange} />
                    <SubmitButton title="Save list" />
                </Form>
            </FormContainer>
            <FaTimes className="fas fa-times closing-x" onClick={onClose} />
        </Card>
    )
}


export default VocabularyForm;
