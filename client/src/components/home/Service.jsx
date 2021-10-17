import React from 'react'
import illustration1 from '../../assests/illustration-2.svg'
import illustration2 from '../../assests/illustration-3.svg'
import illustration3 from '../../assests/illustration-4.svg'

const Service = () => {
    return (
        <div className="w-5/6 md:w-3/4 mx-auto my-10 md:my-20">
            <h2 className="text-center text-2xl md:text-4xl font-bold mb-4">Fitur Kami</h2>
            <div className="flex flex-col md:flex-row gap-10 text-center">
                <div className="md:w-1/3 p-6 rounded-md shadow-md bg-white dark:bg-teal-900">
                    <div className="h-56 flex items-center">
                        <img src={illustration1} className="w-full mb-4" alt="illustration 1" />
                    </div>
                    <h2 className="text-2xl font-semibold text-teal-500">Pameran Kreatif</h2>
                    <p>Dengan fitur ini, kamu bisa memamerkan karya-karya kreatif yang telah kamu buat. Karyamu akan ditampilkan dan dipamerkan supaya bisa dilihat oleh orang lain.</p>
                </div>
                <div className="md:w-1/3 p-6 rounded-md shadow-md bg-white dark:bg-teal-900">
                    <div className="h-56 flex items-center">
                        <img src={illustration2} className="w-full mb-4" alt="illustration 1" />
                    </div>
                    <h2 className="text-2xl font-semibold text-teal-500">Angkut Sampah</h2>
                    <p>Di aplikasi ini, juga terdapat layanan angkut sampah. Kamu bisa meminta pengangkut sampah untuk mengambil sampah yang telah kamu sediakan.</p>
                </div>
                <div className="md:w-1/3 p-6 rounded-md shadow-md bg-white dark:bg-teal-900">
                    <div className="h-56 flex items-center">
                        <img src={illustration3} className="w-full mb-4" alt="illustration 1" />
                    </div>
                    <h2 className="text-2xl font-semibold text-teal-500">Toko Kreatif</h2>
                    <p>Fitur toko kreatif memungkinkan kamu untuk membeli karya-karya kreatif yang dibuat menggunakan sampah-sampah yang sudah tidak terpakai.</p>
                </div>
            </div>
        </div>
    )
}

export default Service
