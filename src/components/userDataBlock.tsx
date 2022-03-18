import React, {useEffect, useState} from "react";
import {UserType} from "../App";
import axios from "axios";
import {Counter} from "./counter";

type userDataBlockPropsType = {
    selectedUser: UserType | null
}

const initialTimerValue = 5

export const UserDataBlock: React.FC<userDataBlockPropsType> = ({selectedUser}) => {

    const [userDataDetails, setUserDataDetails] = useState<UserType | null>({} as UserType)
    const [initialTimerSeconds, setInitialTimerSeconds] = useState<number>(initialTimerValue)

    useEffect( () => {
        if (initialTimerSeconds <= 0) {
            setUserDataDetails(null)
        }
    }, [initialTimerSeconds] )

    useEffect(() => {
        if (!!selectedUser) {
            axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setInitialTimerSeconds(initialTimerValue)
                    setUserDataDetails(res.data)
                })
        }
    }, [selectedUser])

    return (
        <div>
            <div><h1> username details</h1></div>
            {userDataDetails &&
                <div>
                    <img src={userDataDetails.avatar_url} alt="No image"/>
                    <div>Followers: {userDataDetails.followers}</div>
                    <Counter
                        initialTimerSeconds={initialTimerSeconds}
                        setInitialTimerSeconds={setInitialTimerSeconds}
                        timerKey={userDataDetails.id}
                    />
                </div>
            }
        </div>
    )
}
