import s from "../App.module.css";
import React, {useEffect, useState} from "react";
import {UserType} from "../App";
import axios from "axios";

type SearchUserType = {
    items: UserType[]
}

type UsersPropsType = {
    selectedUser: UserType | null
    selectLogin: (user: UserType) => void
    searchTerm: string
}

export const Users: React.FC<UsersPropsType> = ({
                                                    selectedUser,
                                                    selectLogin,
                                                    searchTerm
                                                }) => {
    const [users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
        axios.get<SearchUserType>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [searchTerm])

    return (
        <ul className={s.userContainer}>
            {users.map(user => {
                const onUserClick = () => {
                    selectLogin(user)
                }

                return (
                    <li
                        key={user.id}
                        className={selectedUser && selectedUser.login === user.login ? s.selected : ''}
                        onClick={onUserClick}
                    >
                        {user.login}
                    </li>
                )
            })}
        </ul>
    )
}
