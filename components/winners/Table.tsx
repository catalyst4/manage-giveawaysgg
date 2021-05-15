import { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getTypes } from '../../redux/actions/typeActions'
import { Row } from '../winners/Row'
  
export const Table = () => {

    const dispatch = useDispatch()

    const { types } = useSelector((state: RootStateOrAny) => state.types)

    useEffect(() => {
      if(!types) {
        dispatch(getTypes())
      }
    }, [types])

    console.log(types)
  
    return (
      <div className="flex flex-col">
        <div className="my-2 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow border-b border-gray-200 sm:rounded-lg">
              <div className="min-w-full divide-y divide-gray-200">
                <div className="bg-gray-50">
                  <div className="flex justify-start px-6 py-3">
                    <div
                      style={{width: '25%'}}
                      className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Giveaway
                    </div>
                    <div
                      style={{width: '25%'}}
                      className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Winners
                    </div>
                    <div
                      style={{width: '25%'}}
                      className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Complete Winners
                    </div>
                    <div
                      style={{width: '25%'}}
                      className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Pending Winners
                    </div>
                  </div>
                </div>
                <div className="bg-white divide-y divide-gray-200">
                  {types?.map((type, i) => (
                    <Row key={i} type={type} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
