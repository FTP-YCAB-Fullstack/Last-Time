import React , {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../axios'
import TableHistory from '../../components/user/TableHistory'
import TableOffice from '../../components/user/TableOffice'



const Normal = () => {
    const auth = useSelector(state => state.auth)
    const token = auth.token

    const [status, setStatus] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [histories, setHistories] = useState([])
    const [offices, setOffices] = useState([])
    const [poinUser, setPoinUser] = useState(0)
    
    useEffect( () => {

        (async () => {
            try {
                 // fetch poin
                let userRes = await axios.get('/users/detail' , {headers: {token}})
                let {poin} = userRes.data.user
                setPoinUser(poin)
                
                // fetch status customer
                let response  = await axios.get('/customers/status' , {headers: {token}})
                let {status , customer} = response.data
                setStatus(status)
                setCustomer(customer)

                if(status) {
                    // fetch history
                    let response = await axios.get(`/transactions/user` , {headers: {token}})
                    setHistories(response.data)
                } else {
                    // fetch office
                    let response = await axios.get('/offices' , {headers: {token}})
                    setOffices(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        })()

    }, [status])

    const handlePickup = async () => {
        let response = await axios.post(`/transactions/user`, {} , {headers: {token}})
        console.log(response)
    }
    
    return (
        <div>
            {
                status ?
                    <div className="flex flex-col md:flex-row mb-10 text-center justify-around">
                        <div>   
                            <h2 className="text-3xl mb-2">Poin : {poinUser}</h2>
                            {
                                customer && customer.status === 'accepted' ?
                                    <button onClick={handlePickup} className="bg-teal-400 text-white py-2 px-6 rounded-md font-semibold">Angkut Sampah</button>
                                :   <div className="bg-gray-400 text-white py-2 px-6 rounded-md font-semibold
                                ">Menunggu</div>
                            }
                        </div>
                        
                        <div>
                            <h2 className="text-3xl mb-2">Pengangkut</h2>
                            <h4 className="text-2xl font-bold tracking-wider text-teal-400">Kantor Cabang Cilacap</h4>
                        </div>
                    </div>
                : null
            }
            {
                status ?
                    <TableHistory data={histories} />
                    : <TableOffice data={offices} setStatus={setStatus} />
            }
        </div>
    )
}

export default Normal
