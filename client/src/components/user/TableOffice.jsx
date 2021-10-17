import React from 'react'
import { useSelector } from 'react-redux'

const TableOffice = ({data , setSelectOffice}) => {
    const handleClick = async (e) => {
        let officeId = null
        let el = e.target
        if(el.tagName === 'svg') {
            officeId = el.parentElement.getAttribute('data-id')
        } else if(el.tagName === 'path') {
            officeId = el.parentElement.parentElement.getAttribute('data-id')
        }
        setSelectOffice(officeId)
    }
    
    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Cari Kantor Terdekat</h2>
            <table className="table-auto overflow-hidden bg-white dark:bg-gray-700 shadow-md w-full rounded">
                <thead className="text-teal-500 dark:text-teal-300 dark:bg-teal-700 h-10 bg-teal-100">
                    <tr>
                        <th>No</th>
                        <th>Kota</th>
                        <th>Pilih</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length ?
                            data.map((office , i) => 
                                <tr key={office._id} className="text-center">
                                    <td>{i + 1}</td>
                                    <td className="text-left">{office.user}</td>
                                    <td className="flex justify-center py-2">
                                        <button className="text-blue-400 hover:opacity-60 transition duration-100" data-id={office._id} onClick={handleClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        :
                            <tr></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableOffice
