import React, {ChangeEvent, useEffect, useState} from "react";

type SearchBlockPropsType = {
    setSearchTerm: (value: string) => void
    initialValue: string
}

export const Search: React.FC<SearchBlockPropsType> = ({
                                                           setSearchTerm,
                                                           initialValue,
                                                       }) => {

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const [value, setValue] = useState<string>('')

    const onClickSearchUser = (value: string) => {
        setSearchTerm(value)
    }

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const setInputValue = () => {
        onClickSearchUser(value)
    }

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={changeInputValue}
            />
            <button type="button" onClick={setInputValue}>
                Find
            </button>
        </div>
    )
}
