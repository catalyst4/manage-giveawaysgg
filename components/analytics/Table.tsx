import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getTypes } from '../../redux/actions/typeActions'

export const Table = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    const { loading, error, types } = useSelector((state: RootStateOrAny) => state.types)

    return (
        <div>
            {loading ? (
                <div>loading</div>
            ) : error ? (
                <div>error</div>
            ) : types && (
                <div>
                    {types.map((type, i) => (
                        <div key={i} className="p-5 mb-5 rounded-2xl">
                            <h1 className="font-russoOne text-2xl mb-2">{type.name}</h1>
                            <div>{type.giveaways.reverse().map(((giveaway, i) => {
                                return (
                                    <Row key={i} giveaway={giveaway} />
                                )
                            }
                            ))}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export const Row = ({ giveaway }) => {
    
    const total = giveaway.totalEntries
    const unique = giveaway.uniqueEntries
    const diff = total - unique
    const diffPercent = ((total-unique) / unique * 100) ? ((total-unique) / unique * 100).toFixed(0) : 0
                            
    return (
        <div className="w-full flex items-center bg-gray-50 mb-5 p-5 rounded-2xl">
            <div>
                <div className="text-2xl font-semibold mr-5">
                    {total} Total Entries 
                    <span className="ml-1 text-sm font-medium text-green-500"> +23/24hr +13%/24hr</span>
                </div>
                <span className="font-medium opacity-50">{unique} Unique Entries</span>
            </div>
            <div>(+{diff} / +{diffPercent}%)</div>
        </div>
    )
}