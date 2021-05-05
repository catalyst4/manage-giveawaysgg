import { ChevronDownIcon, ChevronUpIcon, RefreshIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { rerollWinner } from '../../redux/actions/giveawayActions'
import { countdown } from '../../util/countdown'
import { Switch } from '../Switch'
import { TextField } from '../TextField'
import { Select } from './Select'

const Row = ({ type }) => {

    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>(type.name)
    const [game, setGame] = useState<string>(type.game)
    const [frequency, setFrequency] = useState<string>(type.frequency)
    const cd = countdown(type.expiry)
    const formatted = cd.days + 'd ' + cd.hours + 'h ' + cd.mins + 'm ' + cd.secs + 's'
    const [expiry ,setExpiry] = useState<string>(formatted)
    const [active, setActive] = useState<boolean>(type.active)
    
    useEffect(() => {
        setExpiry(formatted)
    }, [cd])

    return (
        <div>
            <div onClick={() => setOpen(!open)} className="flex justify-start px-6 py-3 cursor-pointer">
                <div className="w-full flex">
                    <div style={{width: '25%'}} className="whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{type.name}</div>
                    </div>
                    <div style={{width: '25%'}} className="whitespace-nowrap">
                        <div className="text-sm text-gray-900">134</div>
                    </div>
                    <div style={{width: '25%'}} className="whitespace-nowrap text-sm text-gray-500">121 ({(121 * 100 / 134).toFixed(0)}%)</div>
                    <div style={{width: '25%'}} className="flex justify-between whitespace-nowrap text-sm text-gray-500">
                        <div>13</div>
                        <button onClick={() => setOpen(!open)} className="focus:outline-none w-5 h-5 opacity-50">
                            {open ? <ChevronUpIcon color="black" /> : <ChevronDownIcon color="black" />}
                        </button>
                    </div>
                </div>
            </div> 
            {open && (
                <div>
                    <div className="flex justify-between bg-gray-50 border border-gray-200 py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div style={{width: '15%'}}>Winner</div>
                        <div style={{width: '30%', marginRight: '15px'}}>Link</div>
                        <div style={{width: '30%', marginRight: '15px'}}>Status</div>
                        <div style={{width: '15%'}}>Re-roll</div>
                        <div style={{width: '10%'}}>Save</div>
                    </div>
                    {type.list.filter(giveaway => giveaway.winner === true).map((winner, i) => (
                        <Winner key={winner._id} type={type} winner={winner} i={i} />
                    ))}
                </div> 
            )}  
        </div>
        
    )
}

export const Winner = ({ type, winner, i }) => {

    console.log(winner)

    const statuses = [
        'Contacting Winner',
        'Fortnite Gifting Cooldown',
        'Prize Received'
    ]

    // const originalLink = winner.link
    // const originalStatus = winner.status

    const [link, setLink] = useState<string>(winner.link ? winner.link : undefined)
    const [selected, setSelected] = useState<string>(statuses[0])

    const dispatch = useDispatch()

    const reroll = () => {
        dispatch(rerollWinner(type._id, winner._id))
    }

    const { loading, error, types } = useSelector((state: RootStateOrAny) => state.types)

    return (
        <>
            <div key={winner.id} 
                className={`${i % 2 && 'bg-gray-50'} flex justify-between items-center px-5 py-2 text-sm text-black`}
            >
                <span style={{width: '15%'}}>{winner.winnerName}</span>
                <input 
                    style={{width: '30%', marginRight: '15px'}}
                    value={link} 
                    placeholder="Link" 
                    onChange={(e) => setLink(e.target.value)}
                    className="bg-transparent border px-3 py-2 rounded-lg focus:outline-none"
                />
                <Select selected={selected} setSelected={setSelected} statuses={statuses} />
                <div style={{width: '15%'}}>
                    <button onClick={reroll}
                        className="focus:outline-none flex py-2 px-3 bg-transparent border border-blue-800 text-blue-800 font-medium rounded-md"
                    >
                        <RefreshIcon className="w-5 h-5 mr-2" />
                        Re-roll
                    </button>    
                </div>
                <button style={{width: '10%'}} onClick={reroll}
                    className={`focus:outline-none py-2 px-3 font-semibold bg-blue-100 text-blue-800 rounded-md`}
                >Save</button>    
            </div>
            {error && (
                <div className="absolute bottom-0 right-0 p-5">
                    <div className="bg-red-100 text-red-800 font-semibold px-4 py-2 rounded-md">{error}</div>
                </div>    
            )}
        </>
    )
}

export { Row }
