import React from 'react'
import CardDashboard from '../../components/user/CardDashboard'

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <div className="flex flex-col md:flex-row gap-6 w-3/4 mx-auto">
                <CardDashboard to="/user/pickup" text="Angkut Sampah" />
                <CardDashboard to="/user/exhibition" text="Pameran Kreatif" />
                <CardDashboard to="/user/store" text="Toko Kreatif" />
            </div>
        </div>
    )
}

export default Dashboard
