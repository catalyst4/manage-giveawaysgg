import React from 'react'
import Chart from './Chart'
import { Table } from './Table'

export const Analytics = () => {

    return (
        <div>
            <h1 className="text-2xl font-bold text-purple-600">Analytics</h1>
            <Chart />
            <Table />
        </div>
    )
}