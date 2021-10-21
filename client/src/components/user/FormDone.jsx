import React , { useState} from 'react'
import axios from '../../axios'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const InputCategoryy = ({label , register, errors , name}) => {
    return (
        <div className="my-2 md:my-4">
            <div className="flex flex-col md:flex-row md:gap-4">
                <label className="py-2 md:px-4 w-28">{label}</label>
                <div className="flex items-center relative rounded overflow-hidden">
                    <input {...register(name)} defaultValue={0} min={0} className="bg-white dark:bg-gray-600 py-2 px-4 pr-10 text-right shadow-md rounded-md focus:outline-none focus:ring-4" type="number" placeholder="Berat" />
                    <div className="absolute right-0 bg-teal-400 dark:bg-teal-700 text-white py-2 px-4 ">
                        Kg
                    </div>
                </div>
            </div>
            <small className="error text-red-400 font-bold">{errors[name]?.message}</small>
        </div>
    )
}

const formSchema = Yup.object({
    paper: Yup.number().min(0).required(),
    glass: Yup.number().min(0).required(),
    plastic: Yup.number().min(0).required(),
    iron: Yup.number().min(0).required(),
    cardboard: Yup.number().min(0).required(),
    poin: Yup.number().min(0).required(),
})

const FormDone = ({id , token , setDoneId}) => {
    const [files, setFiles] = useState([])

    const {register, handleSubmit , formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })
    
    const onSubmit = async (data) => {
        let formData = new FormData()
        formData.append('image' , files[0].file)
        formData.append('paper',data.paper)
        formData.append('glass',data.glass)
        formData.append('plastic',data.plastic)
        formData.append('iron',data.iron)
        formData.append('cardboard',data.cardboard)
        formData.append('poin', data.poin)
        
        try {
            let response = await axios.patch(`/transactions/${id}/receive`  , formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            if(response.status === 200) setDoneId(null)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="md:w-2/3 mx-auto my-10">
            <h2 className="text-2xl font-bold mb-4">Form Terima</h2>
            <a href={process.env.REACT_APP_CLASIFIER} target="_blank" rel="noopener noreferrer">
                <button className="bg-teal-300 dark:bg-teal-700 dark:hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded hover:bg-teal-400 transition duration-200">
                    Pilah Sampah
                </button>
            </a>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="my-6">
                    <h3 className="font-bold">Kategori Sampah</h3>
                    <InputCategoryy register={register} errors={errors} label="Kertas" name="paper" />
                    <InputCategoryy register={register} errors={errors} label="Gelas" name="glass" />
                    <InputCategoryy register={register} errors={errors} label="Plastik" name="plastic" />
                    <InputCategoryy register={register} errors={errors} label="Logam" name="iron" />
                    <InputCategoryy register={register} errors={errors} label="Kardus" name="cardboard" />
                </div>
                <div className="my-6">
                    <div className="flex flex-col md:flex-row md:gap-4">
                    <label className="py-2 px-4 w-28">Poin</label>
                    <input {...register('poin')} defaultValue={0} min={0} className="bg-white dark:bg-gray-600 py-2 px-4 shadow-md text-right rounded-md focus:outline-none focus:ring-4" type="number" />
                    </div>
                    <small className="error text-red-400 font-bold">{errors.poin?.message}</small>
                </div>
                <div className="shadow-md">
                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={false}
                        //max file upload
                        maxFileSize={'3MB'}
                        name="image"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
            <div className="flex justify-between">
                <button onClick={() => setDoneId(null)} type="button" className="flex flex-row gap-2 bg-gray-400 text-white dark:bg-gray-600 font-semibold py-2 px-4 rounded hover:bg-gray-500 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                    </svg>
                    <span>Kembali</span>
                </button>
                <button className="flex flex-row gap-2  items-center bg-teal-300 dark:bg-teal-700 dark:hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded hover:bg-teal-400 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span>Kirim</span>
                </button>
            </div>
            </form>
        </div>
    )
}

export default FormDone
