import React, {useEffect, useState} from "react";

type CounterPropsType = {
    initialTimerSeconds: number
    setInitialTimerSeconds: (value: number) => void
    timerKey: number
}

export const Counter: React.FC<CounterPropsType> = ({
                                                        initialTimerSeconds,
                                                        setInitialTimerSeconds,
                                                        timerKey
                                                    }) => {

    const [seconds, setSeconds] = useState<number>(initialTimerSeconds);

    useEffect(() => {
        setSeconds(initialTimerSeconds)
    }, [initialTimerSeconds])

    useEffect(() => {
        setInitialTimerSeconds(seconds)
    }, [seconds,])

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Tick')
            setSeconds(seconds => seconds - 1)
        }, 1000);
        return () => clearInterval(interval)
    }, [timerKey]);

    return (
        <div>
            <h2> Here a counter </h2>
            <h2>{seconds}</h2>
        </div>
    )
}
