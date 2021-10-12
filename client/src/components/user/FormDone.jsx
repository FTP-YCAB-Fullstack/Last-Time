import React , { useState , useRef} from 'react'
import axios from '../../axios'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const InputCategoryy = ({label , name}) => {
    return (
        <div className="my-4 flex flex-row gap-4">
            <label className="py-2 px-4 w-28">{label}</label>
            <input className="bg-white py-2 px-4 shadow-md rounded-md focus:outline-none focus:ring-4" type="number" placeholder="Berat" name={name} />
        </div>
    )
}

const FormDone = ({id , token , setDoneId}) => {
    const [files, setFiles] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('image' , files[0].file)
        formData.append('paper',e.target.paper.value)
        formData.append('glass',e.target.glass.value)
        formData.append('plastic',e.target.plastic.value)
        formData.append('iron',e.target.iron.value)
        formData.append('cardboard',e.target.cardboard.value)
        formData.append('poin', e.target.poin.value)
        
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
        <div>
            <h2>Form Terima</h2>
            
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="my-6">
                    <h3>Kategori Sampah</h3>
                    <InputCategoryy label="Kertas" name="paper" />
                    <InputCategoryy label="Gelas" name="glass" />
                    <InputCategoryy label="Plastik" name="plastic" />
                    <InputCategoryy label="Logam" name="iron" />
                    <InputCategoryy label="Kardus" name="cardboard" />
                </div>
                <div className="my-6 flex flex-row gap-4`">
                    <label className="py-2 px-4 w-28">Poin</label>
                    <input className="bg-white py-2 px-4 shadow-md rounded-md focus:outline-none focus:ring-4" name="poin" type="number" />
                </div>
                <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    //max file upload
                    maxFileSize={'3MB'}
                    name="image"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
            <button className="bg-teal-300 text-white font-semibold py-2 px-4 rounded hover:bg-teal-400 transition duration-200">Kirim</button>
            </form>
        </div>
    )
}

export default FormDone
