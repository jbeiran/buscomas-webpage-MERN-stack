import React, {useState, useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const initialState = {
    title: '',
    description: '',
    province: '',
    category: '',
    phone: '',	
    phone2: '',
    phone3: '',
    phone4: '',
    phone5: '',
    content: '',
    zone : '',
    date: new Date().toLocaleDateString(),
    id: ''
}

function CreateAd() {
    const state = useContext(GlobalState)
    const [ad, setAd] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState([])
    const [isAdmin] = state.userAPI.isAdmin

    const [onEdit, setOnEdit] = useState(false)
    const [token] = state.token

    const param = useParams()
    const [ads] = state.adsAPI.ads
    const [callback, setCallback] = state.adsAPI.callback

    useEffect(() => {
        document.title = 'Create Ad'
        if(param.id){
            setOnEdit(true)
            ads.forEach(ad => {
                if(ad._id === param.id){
                    setAd(ad)
                    setImages(ad.images)
                }
            })
            
        } else {
            setOnEdit(false)
            setAd(initialState)
            setImages([])
        }
    },[param.id, ads])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setAd({...ad, [name]:value})
    }

    const handleUploadInput = async e => {
        let newImages = []
        let num = 0
        const files = [...e.target.files]

        if(files.length === 0) return alert("No files were uploaded.")

        files.forEach(file => {
            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("File format is incorrect.")

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })

        const imgCount = images.length
        if(imgCount + newImages.length > 5)
            return alert("Select up to 5 images.")

        let imgArr = []
        for (const item of newImages) {
            const formData = new FormData()
            formData.append('file', item)

            const res = await fetch('/api/upload', {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: token
                }
            })

            const data = await res.json()
            imgArr.push(data)

        }
        setImages([...images, ...imgArr])
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if(!isAdmin) return alert("You're not an admin.")
            if(images.length===0) return alert("No image upload")
    
            if(onEdit){
                await axios.put(`/api/ads/${ad._id}`, {...ad, images}, {
                    headers: {Authorization: token}
                })
    
            }else{
                await axios.post('/api/ads', {...ad, images}, {
                    headers: {Authorization: token}
                })
            }
            
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    return (
        <div className="ads_manager">
            <form className='row' onSubmit={handleSubmit}>
                <div className='col-md-6'>

                    <input type="text" name="title" 
                    id="title" placeholder="Nome" 
                    value={ad.title} className="d-block my-4 w-100 p-2" 
                    onChange={handleChangeInput} />
        
                    <textarea type="text" name="description"
                    id="description" placeholder="Titolo"
                    value={ad.description} className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} 
                    cols="30" rows="4"/>

                    <textarea type="text" name="content"
                    id="content" placeholder="Testo"
                    value={ad.content} className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} 
                    cols="30" rows="6"/>

                    <input type="text" name="phone"
                    id="phone" placeholder="Phone"
                    value={ad.phone} className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                    <input type="text" name="phone2"
                    id="phone2" placeholder="Phone 2"
                    value={ad.phone2} className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                    <input type="text" name="phone3"
                    id="phone3" placeholder="Phone 3"
                    value={ad.phone3} className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                    <input type="text" name="phone4"
                    id="phone4" placeholder="Phone 4"
                    value={ad.phone4} className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                    <input type="text" name="phone5"
                    id="phone5" placeholder="Phone 5"
                    value={ad.phone5} className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                    <div className='row'>
                        <div className='col-sm-6'>
                            <select name="province" id="province" value={ad.province} 
                            onChange={handleChangeInput}
                            className="d-block w-100 p-2">
                                <option value="">Select a province</option>
                                <option translate="no" value="Agrigento">Agrigento</option>
                                    <option translate="no" value="Alessandria">Alessandria</option>
                                    <option translate="no" value="Ancona">Ancona</option>
                                    <option translate="no" value="Aosta">Aosta</option>
                                    <option translate="no" value="Arezzo">Arezzo</option>
                                    <option translate="no" value="Ascoli">Ascoli</option>
                                    <option translate="no" value="Asti">Asti</option>
                                    <option translate="no" value="Avellino">Avellino</option>
                                    <option translate="no" value="Bari">Bari</option>
                                    <option translate="no" value="Barletta">Barletta</option>
                                    <option translate="no" value="Belluno">Belluno</option>
                                    <option translate="no" value="Benevento">Benevento</option>
                                    <option translate="no" value="Biella">Biella</option>
                                    <option translate="no" value="Bologna">Bologna</option>
                                    <option translate="no" value="Bolzano">Bolzano</option>
                                    <option translate="no" value="Brescia">Brescia</option>
                                    <option translate="no" value="Brindisi">Brindisi</option>
                                    <option translate="no" value="Cagliari">Cagliari</option>
                                    <option translate="no" value="Caltanissetta">Caltanissetta</option>
                                    <option translate="no" value="Campobaso">Campobaso</option>
                                    <option translate="no" value="Carbonia Iglesias">Carbonia Iglesias</option>
                                    <option translate="no" value="Caserta">Caserta</option>
                                    <option translate="no" value="Catania">Catania</option>
                                    <option translate="no" value="Catanzaro">Catanzaro</option>
                                    <option translate="no" value="Chieti">Chieti</option>
                                    <option translate="no" value="Como">Como</option>
                                    <option translate="no" value="Cosenza">Cosenza</option>
                                    <option translate="no" value="Cremona">Cremona</option>
                                    <option translate="no" value="Crotone">Crotone</option>
                                    <option translate="no" value="Cuneo">Cuneo</option>
                                    <option translate="no" value="Enna">Enna</option>
                                    <option translate="no" value="Fermo">Fermo</option>
                                    <option translate="no" value="Ferrara">Ferrara</option>
                                    <option translate="no" value="Firenze">Firenze</option>
                                    <option translate="no" value="Foggia">Foggia</option>
                                    <option translate="no" value="Forlí">Forlí</option>
                                    <option translate="no" value="Crotone">Crotone</option>
                                    <option translate="no" value="Frosione">Frosione</option>
                                    <option translate="no" value="Genova">Genova</option>
                                    <option translate="no" value="Gorizia">Gorizia</option>
                                    <option translate="no" value="Grosseto">Grosseto</option>
                                    <option translate="no" value="Imperia">Imperia</option>
                                    <option translate="no" value="L'Aquila">L'Aquila</option>
                                    <option translate="no" value="La Spezia">La Spezia</option>
                                    <option translate="no" value="Latina">Latina</option>
                                    <option translate="no" value="Lecce">Lecce</option>
                                    <option translate="no" value="Lecco">Lecco</option>
                                    <option translate="no" value="Livorno">Livorno</option>
                                    <option translate="no" value="Lodi">Lodi</option>
                                    <option translate="no" value="Lucca">Lucca</option>
                                    <option translate="no" value="Macerata">Macerata</option>
                                    <option translate="no" value="Mantova">Mantova</option>
                                    <option translate="no" value="Massa Carrara">Massa Carrara</option>
                                    <option translate="no" value="Matera">Matera</option>
                                    <option translate="no" value="Medio Campidano">Medio Campidano</option>
                                    <option translate="no" value="Messina">Messina</option>
                                    <option translate="no" value="Milano">Milano</option>
                                    <option translate="no" value="Modena">Modena</option>
                                    <option translate="no" value="Monza">Monza</option>
                                    <option translate="no" value="Napoli">Napoli</option>
                                    <option translate="no" value="Novara">Novara</option>
                                    <option translate="no" value="Nuoro">Nuoro</option>
                                    <option translate="no" value="Ogliastra">Ogliastra</option>
                                    <option translate="no" value="Olbia Tempio">Olbia Tempio</option>
                                    <option translate="no" value="Oristano">Oristano</option>
                                    <option translate="no" value="Padova">Padova</option>
                                    <option translate="no" value="Palermo">Palermo</option>
                                    <option translate="no" value="Parma">Parma</option>
                                    <option translate="no" value="Pavia">Pavia</option>
                                    <option translate="no" value="Perugia">Perugia</option>
                                    <option translate="no" value="Pescara">Pescara</option>
                                    <option translate="no" value="Piacenza">Piacenza</option>
                                    <option translate="no" value="Pisa">Pisa</option>
                                    <option translate="no" value="Pistoia">Pistoia</option>
                                    <option translate="no" value="Pordenone">Pordenone</option>
                                    <option translate="no" value="Potenza">Potenza</option>
                                    <option translate="no" value="Prato">Prato</option>
                                    <option translate="no" value="Ragusa">Ragusa</option>
                                    <option translate="no" value="Ravenna">Ravenna</option>
                                    <option translate="no" value="Reggio Calabria">Reggio Calabria</option>
                                    <option translate="no" value="R. Emilia">R. Emilia</option>
                                    <option translate="no" value="Rieti">Rieti</option>
                                    <option translate="no" value="Rimini">Rimini</option>
                                    <option translate="no" value="Roma">Roma</option>
                                    <option translate="no" value="Rovigo">Rovigo</option>
                                    <option translate="no" value="Salerno">Salerno</option>
                                    <option translate="no" value="Sassari">Sassari</option>
                                    <option translate="no" value="Savona">Savona</option>
                                    <option translate="no" value="Siena">Siena</option>
                                    <option translate="no" value="Siracusa">Siracusa</option>
                                    <option translate="no" value="Sondrio">Sondrio</option>
                                    <option translate="no" value="Taranto">Taranto</option>
                                    <option translate="no" value="Teramo">Teramo</option>
                                    <option translate="no" value="Terni">Terni</option>
                                    <option translate="no" value="Torino">Torino</option>
                                    <option translate="no" value="Trapani">Trapani</option>
                                    <option translate="no" value="Trento">Trento</option>
                                    <option translate="no" value="Treviso">Treviso</option>
                                    <option translate="no" value="Trieste">Trieste</option>
                                    <option translate="no" value="Udine">Udine</option>
                                    <option translate="no" value="Urbino">Urbino</option>
                                    <option translate="no" value="Varese">Varese</option>
                                    <option translate="no" value="Venezia">Venezia</option>
                                    <option translate="no" value="Verbania">Verbania</option>
                                    <option translate="no" value="Vercelli">Vercelli</option>
                                    <option translate="no" value="Verona">Verona</option>
                                    <option translate="no" value="Vibo Valentia">Vibo Valentia</option>
                                    <option translate="no" value="Vicenza">Vicenza</option>
                                    <option translate="no" value="Viterbo">Viterbo</option>
                            </select>
                        </div>

                        <div className='col-sm-6'>
                            <select name="category" value={ad.category} className="d-block w-100 p-2" onChange={handleChangeInput}>
                                <option value="">Categoria</option>
                                {
                                    categories.map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <input type="text" name="zone"
                    id="zone" placeholder="Zona"
                    value={ad.zone} className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />


                    <input type="text" 
                        className="d-block my-4 w-100 p-2" 
                        name="date" 
                        onChange={handleChangeInput} 
                        placeholder={new Date().toLocaleDateString()}
                        disabled
                    />

                    <button type="submit" className="btn btn-dark my-4 px-5">{onEdit ? "Aggiorna" : "Pubblica"}</button>
                
                </div>

                <div className='col-md-6 my-4'>
                    <div className='input-group mb-3'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Upload</span>
                        </div>

                        <div className='custom-file border rounded'>
                            <input type='file' className='custom-file-input'
                            onChange={handleUploadInput} name='images' multiple accept="image/*" />
                        </div>
                    </div>

                    <div className='row img-up mx-0'>
                        {
                            images.map((img, index) => (
                                <div key={index} className='file_img'>
                                    <img src={img.url ? img.url : URL.createObjectURL(img)} alt=""
                                    className='img-thumbnail rounded' />

                                    <span onClick={() => deleteImage(index)}>X</span>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateAd