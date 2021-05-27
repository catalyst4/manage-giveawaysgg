import React from 'react'
import { Line, defaults } from 'react-chartjs-2'
import { RootStateOrAny, useSelector } from 'react-redux'

defaults.font.family = "'Poppins', sans-serif"

const Chart = () => {

    const { loading, error, types } = useSelector((state: RootStateOrAny) => state.types)
    
    let totalEntries = []
    if(types) {
        totalEntries = types[0].giveaways
            .reverse()
            .filter(giveaway => giveaway.totalEntries > 0)
            .map(giveaway => {
                return giveaway.totalEntries
            })

        console.log(totalEntries)    
    }

    let uniqueEntries = []
    if(types) {
        uniqueEntries = types[0].giveaways
            .filter(giveaway => giveaway.uniqueEntries > 0)
            .map(giveaway => {
                return giveaway.uniqueEntries
            })

        console.log(totalEntries)    
    }
    

    const data = {
        labels: ['5 Days Ago', '4 Days Ago', '3 Days Ago', '2 Days Ago', 'Yesterday', 'Today'],
        datasets: [
          {
            label: 'Daily Total Entries',
            data: totalEntries,
            fill: false,
            backgroundColor: '#7C3AED',
            borderColor: '#7C3AED',
            tension: 0.2,
          },
          {
            label: 'Daily Unique Entries',
            data: uniqueEntries,
            fill: false,
            backgroundColor: '#DB2777',
            borderColor: '#DB2777',
            tension: 0.2,
          },
        ],
      }

    const options = {
        plugins: {
            legend: {
                labels: {
                    family: "'Poppins', sans-serif"
                }
            }
        },
        scales: {
            yAxes: [
            {
                ticks: {
                beginAtZero: true,
                },
            },
            ],
        },
    }

    return (
        <div>
            {loading ? (
                <div>loading</div>
            ) : error ? (
                <div>error</div>
            ) : (
                <Line type={Line} data={data} options={options} />
            )}
        </div>
    )
}

export default Chart
