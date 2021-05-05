import React, { useEffect, useState } from 'react'
import { Table } from './Table'
import { PlusIcon } from '@heroicons/react/solid'
import { Modal } from './Modal'
import { TextField } from '../TextField'
import { Switch } from '../Switch'
import { useDispatch } from 'react-redux'
import { newType } from '../../redux/actions/typeActions'

const Giveaways = () => {

    const [open, setOpen] = useState(false)

    const [name, setName] = useState<string>(undefined)
    const [game, setGame] = useState<string>(undefined)
    const [frequency, setFrequency] = useState<string>(undefined)
    const [active, setActive] = useState<boolean>(false)
    const [valid, setValid] = useState<boolean>(false)
    const [submit, setSubmit] = useState<boolean>(false)

    const dispatch = useDispatch()

    const newGiveaway = () => {
        setOpen(false)
        setName(undefined)
        setGame(undefined)
        setFrequency(undefined)
        setActive(undefined)
        setSubmit(true)
        if(!submit) {
            dispatch(newType({ name, game, frequency, active }))   
        }
        
    }

    useEffect(() => {
        if(name && game && frequency) {
            setValid(true)
        } else {
            setValid(false)
        }
        if(submit) {
            setInterval(() => {
                setSubmit(false)
            }, 1000)
        }
    }, [name, game, frequency, active, submit])

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Giveaways</h1>
                <button 
                    className="text-xs bg-white text-gray-700 px-3 py-2 rounded-md font-semibold focus:outline-none" 
                    onClick={() => setOpen(true)}
                >   
                    New Giveaway
                </button>  
            </div>
            <Table />
            <Modal open={open} onClose={() => setOpen(false)}>
                <h1 className="text-xl font-bold mb-2">New Giveaway</h1>
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
                    <button 
                        onClick={newGiveaway}
                        disabled={!valid}
                        className={`${!valid && 'opacity-30 cursor-not-allowed'} transition focus:outline-none focus:bg-blue-200 px-4 py-2 bg-blue-100 text-blue-600 text-sm font-semibold rounded-md`}
                    >Save</button>
                </div>
            </Modal>
        </div>
    )
}

export { Giveaways }
