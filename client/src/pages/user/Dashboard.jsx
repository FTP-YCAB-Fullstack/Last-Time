import React from 'react'
import CardDashboard from '../../components/user/CardDashboard'

const Dashboard = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-6 mx-auto">
                <CardDashboard icon="truck" to="/user/pickup" text="Angkut Sampah" />
                <CardDashboard icon="gallery" to="/user/exhibition" color="blue" text="Pameran Kreatif" />
                <CardDashboard icon="cart" to="/user/store" color="indigo" text="Toko Kreatif" />
            </div>
        </div>
    )
}

export default Dashboard
