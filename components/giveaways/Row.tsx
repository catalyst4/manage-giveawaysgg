import { TrashIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteType, editType } from '../../redux/actions/typeActions'
import { countdown } from '../../util/countdown'
import { Switch } from '../Switch'
import { TextField } from '../TextField'
import { Modal } from './Modal'

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

    const dispatch = useDispatch()

    const editHandler = () => {
        setOpen(false)
        dispatch(editType({ name, game, frequency, active }, type.type))
    }

    const deleteHandler = () => {
        setOpen(false)
        dispatch(deleteType(type.type))
    }

    return (
        <>
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full" src="/img/fortnite.jpg"alt="" />
                </div>
                <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{type.name}</div>
                <div className="text-sm text-gray-500 capitalize">{type.game} • {type.frequency}</div>
                </div>
            </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">23,461 Total Entries</div>
            <div className="text-sm text-gray-500">341 in the past hour</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">01:00 2/5/21</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expiry}</td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${type.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} `}>
                {type.active ? 'Active' : 'Inactive'}
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button onClick={() => setOpen(true)} className="focus:outline-none text-purple-600 hover:text-purple-900">
                Edit
            </button>
            </td>
        </tr>
        <Modal open={open} onClose={() => setOpen(false)}>
        <h1 className="text-xl font-bold mb-2">Edit "{name}"</h1>
                <TextField
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    value={game}
                    placeholder="Game"
                    onChange={(e) => setGame(e.target.value)}
                />
                <TextField
                    value={frequency}
                    placeholder="Frequency"
                    onChange={(e) => setFrequency(e.target.value)}
                />
                <div className="flex">
                    <Switch active={active} setActive={setActive} /> 
                    <span className="ml-2">{active ? 'Active' : 'Inactive'} </span>  
                </div>
                <div className="flex justify-end">
                    <div className="flex justify-start items-center">
                        <button className="w-5 h-5 mr-2 opacity-20" onClick={deleteHandler}>
                            <TrashIcon />
                        </button>
                        <button 
                            onClick={editHandler}
                            className="focus:outline-none focus:bg-purple-200 px-4 py-2 bg-purple-100 text-purple-600 text-sm font-semibold rounded-md"
                        >Save</button>    
                    </div>
                    
                </div>
        </Modal>
        </>
    )
}

export { Row }
