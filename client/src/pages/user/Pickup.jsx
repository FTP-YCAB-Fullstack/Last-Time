import React from 'react'
import {useSelector} from 'react-redux'
import Normal from './Normal'
import Pickuper from './Pickuper'

const Pickup = () => {
    const auth = useSelector(state => state.auth)
    return auth.subRole.includes('pickuper') ?
                        <Pickuper /> : <Normal />
}

export default Pickup
