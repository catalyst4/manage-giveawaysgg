import { useEffect, useState } from "react"

export const countdown = (timestamp) => {

    const now = Date.now()
    const nowRemaining = timestamp - now

    if(nowRemaining < 0) {
        return {
            days: 0,
            hours: 0,
            mins: 0,
            secs: 0
        }
    }

    const getDays = (remaining) => Math.floor(remaining / (1000 * 60 * 60 * 24))
    const getHours = (remaining) => Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const getMins = (remaining) => Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    const getSecs = (remaining) => Math.floor((remaining % (1000 * 60)) / 1000)

    const [days, setDays] = useState<number>(getDays(nowRemaining))
    const [hours, setHours] = useState<number>(getHours(nowRemaining))
    const [mins, setMins] = useState<number>(getMins(nowRemaining))
    const [secs, setSecs] = useState<number>(getSecs(nowRemaining))

    useEffect(() => {
        setTimeout(() => {
            const now = Date.now()
            const remaining = timestamp - now
            setDays(getDays(remaining))
            setHours(getHours(remaining))
            setMins(getMins(remaining))
            setSecs(getSecs(remaining))
        }, 1000)
    }, [days, hours, mins, secs])

    return {
        days,
        hours,
        mins,
        secs,
    }

}