import { useEffect, useState } from "react";
import { Box, Text, Input, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { SideBarProps } from "src/types/user";


const Sidebar = ({ users, currentUser, setCurrentUser }: SideBarProps ) => {

    const [searchField, setSearchField] = useState('');
    const [ lastUpdated, setLastUpdated] = useState(false);


    const searchUser = (e) => {
        const { value } = e.target;
        setSearchField(value);
    }

    

    return (
        <Box p="20px" overflowY="auto" color="white" bg="blue.500" w="30%" h="100vh" shadow="md">
            <Box alignItems="center" justifyContent="space-between"  mb="20px" display="flex">
            <Text as="h1" fontSize="4xl" textAlign="center">Contacts</Text>
            <Button onClick={() => setCurrentUser(null)} borderRadius="lg" bg="blue.200"><AddIcon /></Button>
            </Box>
            <Input type="text" bg="white" color="black" placeholder="Search a Name" mb="20px" onChange={searchUser} value={searchField}/>
            {users.length? 
            <>
            <Button mb="20px" bg={`${lastUpdated ? 'green.200' : 'red.200'}`} onClick={()=> setLastUpdated(!lastUpdated)}>{lastUpdated ? 'Oldest' : 'Newest'}</Button>
            <Box h="70%" overflowY="auto"> 
                {
                    [].concat(users).sort((a,b) => !lastUpdated ? parseInt(a.key) - parseInt(b.key) : parseInt(b.key) - parseInt(a.key)). filter(userF => userF.fullName.toLowerCase().includes(searchField.toLowerCase())).map(user => (
                        <Box onClick={() => setCurrentUser(user.key)} px="20px" key={user.key} style={{cursor: 'pointer'}} py="10px" bg={`${currentUser=== user.key ? 'blue.400' : 'blue.700'}`}mb="20px" borderRadius="12px">
                            <Text fontSize="lg" fontWeight="bold">{user.fullName}</Text>
                        </Box>
                    ))
                }
            </Box> 
            </>
            : 
            <Box h="80%" bg='blue.400' borderRadius="10px" display="flex" justifyContent="center" alignItems="center">
                <Text as="h2" fontSize="3xl">No Contacts Yet.</Text>
            </Box>
                
            }

       </Box>
    )
}

export default Sidebar;