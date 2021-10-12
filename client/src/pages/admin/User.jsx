import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link , Switch , Route } from 'react-router-dom'
import CardDashboard from '../../components/admin/CardDashboard'
import ContainerCardDashboard from '../../components/admin/ContainerCardDashboard'
import axios from '../../axios'
import TableUsers from '../../components/admin/TableUsers'
import FormSearch from '../../components/admin/FormSearch'
import AddOffice from '../../components/admin/AddOffice'
import AddAdmin from '../../components/admin/AddAdmin'

const User = () => {
    const auth = useSelector(state => state.auth)
    const token = auth.token
    const {users} = useSelector(state => state.adminCount)   
    let {admins, members,pickupers} = users

    useEffect(() => {
        (async() => {
            let res = await axios.get('/users/normal/subRole' , {headers: {token}})
            setData(res.data.users)
        })()
    }, [])
    
    // fetch data for table
    const [data, setData] = useState([])
    const handleClick = async (e) => {
        let text = e.target.getAttribute('data-info')
        let res = text!== 'pickuper' ?
            await axios.get(`/users/${text}/role` , {headers: {token}})
            : await axios.get(`/users/${text}/subRole` , {headers: {token}})
            setData(res.data.users)
    }

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
        <div>
            <ContainerCardDashboard>
                <CardDashboard onClick={handleClick} data-info="admin" number={admins} text="Admin" />
                <CardDashboard onClick={handleClick} data-info="pickuper"  number={pickupers} text="Pengangkut" />
                <CardDashboard onClick={handleClick} data-info="user"  number={members} text="Member" />
            </ContainerCardDashboard>
            <div className="flex flex-row gap-4">
                <Link to="/admin/users/office/add">
                    <button className="flex flex-row gap-2 bg-teal-300 text-white font-semibold py-2 px-4 rounded hover:bg-teal-400 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Pengangkut</span>
                    </button>
                </Link>
                <Link to="/admin/users/admin/add">
                    <button className="flex flex-row gap-2 bg-teal-300 text-white font-semibold py-2 px-4 rounded hover:bg-teal-400 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Admin</span>
                    </button>
                </Link>
            </div>
            
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
    )
}

export default User
