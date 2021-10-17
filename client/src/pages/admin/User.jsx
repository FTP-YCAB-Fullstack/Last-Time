import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Link , Switch , Route } from 'react-router-dom'
import CardDashboard from '../../components/admin/CardDashboard'
import ContainerCardDashboard from '../../components/admin/ContainerCardDashboard'
import axios from '../../axios'
import TableUsers from '../../components/admin/TableUsers'
import FormSearch from '../../components/admin/FormSearch'
import AddOffice from '../../components/admin/AddOffice'
import AddAdmin from '../../components/admin/AddAdmin'
import ModalDelete from '../../components/ModalDelete'
import { fetchUsersCount } from '../../redux/actions/adminCount'
import { deleteCallback } from '../../redux/actions/storeDelete'

const Navigation = () => {
    return (
        <div className="flex flex-wrap flex-row gap-2 md:gap-4">
            <Link to="/admin/users" >
                <button className="flex flex-row gap-2 bg-teal-300 dark:bg-teal-800 dark:text-teal-400 text-white font-semibold py-2 px-4 rounded dark:hover:bg-teal-700 hover:bg-teal-400 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Data</span>
                </button>
            </Link>
            <Link to="/admin/users/office/add">
                <button className="flex flex-row gap-2 bg-teal-300 dark:bg-teal-800 dark:text-teal-400 text-white font-semibold py-2 px-4 rounded dark:hover:bg-teal-700 hover:bg-teal-400 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Pengangkut</span>
                </button>
            </Link>
            <Link to="/admin/users/admin/add">
                <button className="flex flex-row gap-2 bg-teal-300 dark:bg-teal-800 dark:text-teal-400 text-white font-semibold py-2 px-4 rounded dark:hover:bg-teal-700 hover:bg-teal-400 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Admin</span>
                </button>
            </Link>
        </div>
    )
}

const User = () => {
    const auth = useSelector(state => state.auth)
    const token = auth.token
    const {users} = useSelector(state => state.adminCount)   
    let {admins, members,pickupers} = users
    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
            let res = await axios.get('/users/normal/subRole' , {headers: {token}})
            setData(res.data.users)
        })()
    }, [])

    // fetch data for table
    const [data, setData] = useState([])
    const fetchUser =async (text) => {
        let res = text !== 'pickuper' ?
                await axios.get(`/users/${text}/role` , {headers: {token}})
            : await axios.get(`/users/${text}/subRole` , {headers: {token}})
            setData(res.data.users)
    }
    const handleClick = async (e) => {
        let text = e.target.getAttribute('data-info')
        fetchUser(text)
        /* let res = text!== 'pickuper' ?
            await axios.get(`/users/${text}/role` , {headers: {token}})
            : await axios.get(`/users/${text}/subRole` , {headers: {token}})
            setData(res.data.users) */
    }

    const storeDelete = useSelector(state => state.delete)
    const cbDelete = (res) => {
        let id = res.data.id
        console.log('ini callback id =>' , id)
        console.log(data)
        fetchUser('user')
        /* let currentData = data.filter(item => {
            console.log(item._id , id, item._id !== id)
            return item._id !== id
        })
        console.log(data , currentData)
        setData([...currentData]) */
        dispatch(fetchUsersCount())
    }
    useEffect(() => {
        dispatch(deleteCallback(cbDelete))
    }, [])

    // filter from search
    const [filterData , setFilterData] = useState([])
    const [keyword, setKeyword] = useState("")
    const handleSearch = (e) => {
        let keyword = e.target.value
        let result = data.filter(item => 
            item.name.toLowerCase().includes(keyword) || 
            item.email.toLowerCase().includes(keyword))
        setKeyword(keyword)
        setFilterData(result)
    }
        
        
    
    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-10">
            
            <div className="md:w-2/3">
                <Navigation/>
                <Switch>
                    <Route exact path="/admin/users">
                        <FormSearch onChange={handleSearch} />
                        <TableUsers token={token} data={!keyword ? data : filterData} setData={setData} />
                    </Route>
                    <Route path="/admin/users/office/add">
                        <AddOffice token={token} />
                    </Route>
                    <Route path="/admin/users/admin/add">
                        <AddAdmin token={token} />
                    </Route>
                </Switch>
            </div>
            <div className="md:w-1/3">
                <ContainerCardDashboard>
                    <CardDashboard onClick={handleClick} className="cursor-pointer" data-info="admin" color="blue" icon="admin" number={admins} text="Admin" />
                    <CardDashboard onClick={handleClick} className="cursor-pointer" data-info="pickuper" color="indigo" icon="office"  number={pickupers} text="Pengangkut" />
                    <CardDashboard onClick={handleClick} className="cursor-pointer" data-info="user" color="green"  number={members} text="Member" />
                </ContainerCardDashboard>
            </div>
            {
                storeDelete.modal ?
                    <ModalDelete />
                : null
            }
        </div>
    )
}

export default User
