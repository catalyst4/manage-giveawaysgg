import React from 'react'
import Chart from './Chart'
import { Table } from './Table'

export const Analytics = () => {

    return (
        <div>
            <h1 className="font-russoOne text-2xl text-purple-600">Analytics</h1>
            <div className="p-5">
                <Chart />
            </div>
            <Table />
        </div>
    )
}