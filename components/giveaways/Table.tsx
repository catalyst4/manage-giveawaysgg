import { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getTypes } from '../../redux/actions/typeActions'
import { Row } from '../giveaways/Row'

const giveaways = [
    {
      name: 'Win a FREE Fortnite Skin',
      game: 'Fortnite',
      frequency: 'daily',
      expiry: 1620239280472,
      active: false,
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image:
        '/img/fortnite.jpg',
    },
    // More people...
]
  
export const Table = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTypes())
  }, [])

  const { loading, error, types } = useSelector((state: RootStateOrAny) => state.types)

  return (
    <div className="flex flex-col">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Giveaway
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Entries
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Expiry Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Expires In
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <div>loading</div>
                ) : error ? (
                  <div>error</div>
                ) : types ? (
                  <>
                    {types.map((type, i) => (
                      <Row key={i} type={type} />
                    ))}
                  </>
                ) : <div>nope</div>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
