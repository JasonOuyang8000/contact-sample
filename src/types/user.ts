import { ReactNode } from 'react';
import { Dispatch, SetStateAction }  from 'react';


export type User = {
    firstName: string;
    lastName: string;
    emails: string[];
}

export type ContactForm = {
    firstName: string;
    lastName: string;
    emails: string[];
}

export type ContactUser = {
    fullName: string;
    key: string;
}


export type ContactViewProps = {
    currentUser: string;
    setCurrentUser: Dispatch<SetStateAction<string>>
    setUsers: Dispatch<SetStateAction<Array<ContactUser>>>
}


export type SideBarProps = {
    users: ContactUser[], 
    currentUser: string | null
    setCurrentUser: Dispatch<SetStateAction<string | null>>
}
