import { ReactElement } from "react";
import { Box, Text, Input, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { ContactUser, SideBarProps } from "src/types/user";


const Sidebar = ({ users, currentUser, setCurrentUser }: SideBarProps ) => {
    console.log(users);
    return (
        <Box p="20px" color="white" bg="blue.500" w="30%" h="100vh" shadow="md">
            <Box alignItems="center" justifyContent="space-between"  mb="20px" display="flex">
            <Text as="h1" fontSize="4xl" textAlign="center">Contacts</Text>
            <Button borderRadius="lg" bg="blue.200"><AddIcon /></Button>
            </Box>
            <Input type="text" bg="white" color="black" placeholder="Search a Name" mb="20px" />
            {users.length? 
            <Box h="80%" overflowY="auto"> 
                {
                    users.map(user => (
                        <Box onClick={() => setCurrentUser(user.key)} px="20px" key={user.key} style={{cursor: 'pointer'}} py="10px" bg={`${currentUser=== user.key ? 'blue.400' : 'blue.700'}`}mb="20px" borderRadius="12px">
                            <Text fontSize="lg" fontWeight="bold">{user.fullName}</Text>
                        </Box>
                    ))
                }
            </Box> 
            : 
            <Box h="80%" bg='blue.400' borderRadius="10px" display="flex" justifyContent="center" alignItems="center">
                <Text as="h2" fontSize="3xl">No Contacts Yet.</Text>
            </Box>
                
            }

       </Box>
    )
}

export default Sidebar;