import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.module.css';
import s from './App.module.css'
import axios from "axios";

type UserType = {
    id: number
    login: string
    avatar_url: string
    followers: number
}

type SearchUserType = {
    items: UserType[]
}

function App() {
    console.log('App render')
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
    const [value, setValue] = useState<string>('Ilya')
    const [searchTerm, setSearchTerm] = useState<string>('Ilya')
    const [users, setUsers] = useState<UserType[]>([])
    const [userDataDetails, setUserDataDetails] = useState<UserType>({} as UserType)

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const searchUser = () => {
        setSearchTerm(value)
    }

    const selectLogin = (user: UserType) => {
        setSelectedUser(user)
        setUserDataDetails(user)
    }

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [])

    useEffect(() => {
        axios.get<SearchUserType>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [searchTerm])

    useEffect(() => {
        if (!!selectedUser) {
            axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDataDetails(res.data)
                    console.log(res.data)
                })
        }
    }, [selectedUser])

    return (
        <div className={s.container}>
            <div>
                <div>
                    <input
                        type="text"
                        value={value}
                        onChange={changeInputValue}
                    />
                    <button onClick={searchUser}>
                        Find
                    </button>
                </div>
                <ul className={s.userContainer}>
                    {users.map(user => {
                        return (
                            <li
                                key={user.id}
                                className={selectedUser && selectedUser.login === user.login ? s.selected : ''}
                                onClick={() => selectLogin(user)}
                            >
                                {user.login}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div>
                <div><h1> username</h1></div>
                <div><h1> details</h1></div>
            </div>
        </div>
    );
}

export default App;
