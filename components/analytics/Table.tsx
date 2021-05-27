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
                        <div key={i}>
                            <h1>{type.name}</h1>
                            <div>{type.giveaways.map(((giveaway, i) => {
                                const total = giveaway.totalEntries
                                const unique = giveaway.uniqueEntries
                                const diff = total - unique
                                const diffPercent = ((total-unique) / unique * 100) ? ((total-unique) / unique * 100).toFixed(0) : 0
                                return (
                                    <div key={i}>#1 / {total} total (+{diff} / +{diffPercent}%) / {unique} unique</div>
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