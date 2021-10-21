import React from 'react'
import illustration from '../../assests/illustration-1.svg'

const About = () => {
    return (
        <div className="flex flex-col md:flex-row-reverse items-center gap-20 w-5/6 md:w-3/4 mx-auto">
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-2xl font-bold">Tentang TivAsh</h1>
                <p className="text-sm md:text-base md:w-4/5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ducimus magni omnis nisi exercitationem eveniet ullam, ipsa iure consectetur provident. Vitae tenetur tempore expedita, sequi odio id similique nobis culpa?</p>
            </div>
            <div className="w-full md:w-1/2">
                <img src={illustration} alt="illustration" />
            </div>
        </div>
    )
}

export default About
