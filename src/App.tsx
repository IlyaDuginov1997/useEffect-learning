import React, {useEffect, useState} from 'react';
import './App.module.css';
import s from './App.module.css'
import {UserDataBlock} from "./components/userDataBlock";
import {Search} from "./components/search";
import {Users} from "./components/users";

export type UserType = {
    id: number
    login: string
    avatar_url: string
    followers: number
}

function App() {
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('Ilya')
    const [modeUserDetails, setModeUserDetails] = useState<boolean>(false)

    const selectLogin = (user: UserType) => {
        setSelectedUser(user)
        setModeUserDetails(true)
    }

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return (
        <div className={s.container}>

            <div>
                <Search
                    initialValue={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <button onClick={() => setSearchTerm('It-kamasutra')}>reset</button>
                <Users
                    selectedUser={selectedUser}
                    selectLogin={selectLogin}
                    searchTerm={searchTerm}
                />
            </div>
            <div>
                {modeUserDetails && <UserDataBlock selectedUser={selectedUser}/>}
            </div>
        </div>
    );
}

export default App;
