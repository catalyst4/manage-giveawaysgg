import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export const Select = ({ status, setStatus, statuses }) => {

  return (
    <div style={{width: '30%', marginRight: '15px'}} className="w-52">
      <Listbox value={status} onChange={setStatus}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button className="relative z-0 w-full py-2 pl-3 pr-10 text-left border rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block truncate">{status}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-10 w-full py-1 mt-1 text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {statuses.map((person, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `${
                          active
                            ? "text-amber-900 bg-amber-100"
                            : "text-gray-900"
                        }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {person}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? "text-amber-600" : "text-amber-600"
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}