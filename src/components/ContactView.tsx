import { Box, HStack, Input, Button, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ContactForm, ContactViewProps, ContactUser } from 'src/types/user';

const ContactView = ({currentUser, setCurrentUser, setUsers} : ContactViewProps) => {
    const [form, setForm] = useState<ContactForm>({firstName: '', lastName: '', emails: []});
    const [emailInput, setEmailInput] = useState<string>('');

    useEffect(() => {
        if (currentUser !== null) {
            const localUser = JSON.parse(localStorage.getItem(currentUser));
            console.log(localStorage.getItem(currentUser));
            console.log(localUser);
            setForm(localUser);
        }
    }, [ currentUser ]);

    const saveEmail = () => {
        if (emailInput !== '') {
            setForm({...form,emails: [...form.emails,emailInput]});
            setEmailInput('');
        }
    }

    const deleteEmail = (e,i) => {
        const emailsCopy = [...form.emails].filter((em, emIndex) => emIndex !== i);
        setForm({...form, emails: emailsCopy});
    }

    const changeName = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value
          
        });
    }

    const addContact = () => {
        if (form.firstName !== '' && form.lastName !== '') {
            const contacts = JSON.parse(localStorage.getItem('users'));
            const key = Math.floor(Date.now() / 1000).toString();
            const newCurrentUser: ContactUser = { fullName: `${form.firstName} ${form.lastName}`, key};
            if (currentUser !== null) {
                const currentIndex = contacts.findIndex((e) => e.key === currentUser);
                localStorage.removeItem(contacts[currentIndex].key);
                contacts[currentIndex] = newCurrentUser;
            } 
            else {
                contacts.push(newCurrentUser);
            }
            localStorage.setItem(key, JSON.stringify({...form}));
            setCurrentUser(key);
            localStorage.setItem('users', JSON.stringify(contacts));                
        }
    }

    return (    
        <Box display="flex" flexDirection="column" justifyContent="space-around" h="100vh" w="70%" p="100px 10px 10px 30px">
            <HStack w="500px" mb="25px">
                <Input name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={changeName} />
                <Input name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={changeName} />
            </HStack>
            <Box w="400px">
                <Text as="h2" mb="15px">Emails</Text>
                <Box  maxH="300px" overflowY="auto" mb="20px">
                {form.emails.length > 0 && form.emails.map((email,i) => (
                    <Box justifyContent="space-between" display="flex"  alignItems="center" spacing="4" p="10px" key={i} overflowY="auto">
                        <Text fontWeight="bold">{email}</Text>

                        <Button onClick={(e) => deleteEmail(e,i)} size="sm" bg="red.200">
                            Delete
                        </Button>
                    </Box>   
                ))}

                </Box>

                <HStack mb="20px">
                    <Input type="text" placeholder="email" onChange={(e) => setEmailInput(e.target.value)} value={emailInput}/>
                    <Button size="md" p="20px" bg="green.200" onClick={saveEmail}>Add Email</Button>
                </HStack>
                {form.emails.length > 0 && <Button bg="red.200" onClick={() => setForm({...form, emails: []})}>Delete All Emails</Button>}
            </Box>

            <HStack>
                {currentUser === null ?
                 <>
                <Button bg="blue.300" isDisabled={form.firstName === '' || form.lastName === ''} onClick={addContact}>Add New Contact</Button>
                <Button bg="red.200" onClick={() => setCurrentUser(null)}>Clear Form</Button> </>
                :
                <>
                 <Button bg="blue.300" isDisabled={localStorage.getItem(currentUser) === JSON.stringify(form) || form.firstName === '' || form.lastName === ''} onClick={addContact}>Save</Button> 
                 <Button bg="blue.700" onClick={() => setCurrentUser(null)}>Add New Contact</Button>
                </>
                }
               
            </HStack>

        </Box>
    );
}


export default ContactView;