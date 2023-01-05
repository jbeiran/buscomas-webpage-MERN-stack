import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.adsAPI.category
    const [sort, setSort] = state.adsAPI.sort
    const [search, setSearch] = state.adsAPI.search
    const [province, setProvince] = state.adsAPI.province

    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    const handleProvince = e => {
        setProvince(e.target.value)
        setSearch('')
    }

    return (
        <div className='filter_menu'>

           <div className="row">
                <select name="category" value={category} onChange={handleCategory}>
                    <option value=''>Tutti gli annunci</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id} >
                                {category.name}
                            </option>
                        ))
                    }
                </select>
           </div>

           <div className="row_provinces">
                <select name="province" value={province} onChange={handleProvince}>
                    <option value=''>Tutte le province</option>
                    <option translate="no" value="province=Agrigento">Agrigento</option>
                    <option translate="no" value="province=Alessandria">Alessandria</option>
                    <option translate="no" value="province=Ancona">Ancona</option>
                    <option translate="no" value="province=Aosta">Aosta</option>
                    <option translate="no" value="province=Arezzo">Arezzo</option>
                    <option translate="no" value="province=Ascoli">Ascoli</option>
                    <option translate="no" value="province=Asti">Asti</option>
                    <option translate="no" value="province=Avellino">Avellino</option>
                    <option translate="no" value="province=Bari">Bari</option>
                    <option translate="no" value="province=Barletta">Barletta</option>
                    <option translate="no" value="province=Belluno">Belluno</option>
                    <option translate="no" value="province=Benevento">Benevento</option>
                    <option translate="no" value="province=Biella">Biella</option>
                    <option translate="no" value="province=Bologna">Bologna</option>
                    <option translate="no" value="province=Bolzano">Bolzano</option>
                    <option translate="no" value="province=Brescia">Brescia</option>
                    <option translate="no" value="province=Brindisi">Brindisi</option>
                    <option translate="no" value="province=Cagliari">Cagliari</option>
                    <option translate="no" value="province=Caltanissetta">Caltanissetta</option>
                    <option translate="no" value="province=Campobaso">Campobaso</option>
                    <option translate="no" value="province=Carbonia Iglesias">Carbonia Iglesias</option>
                    <option translate="no" value="province=Caserta">Caserta</option>
                    <option translate="no" value="province=Catania">Catania</option>
                    <option translate="no" value="province=Catanzaro">Catanzaro</option>
                    <option translate="no" value="province=Chieti">Chieti</option>
                    <option translate="no" value="province=Como">Como</option>
                    <option translate="no" value="province=Cosenza">Cosenza</option>
                    <option translate="no" value="province=Cremona">Cremona</option>
                    <option translate="no" value="province=Crotone">Crotone</option>
                    <option translate="no" value="province=Cuneo">Cuneo</option>
                    <option translate="no" value="province=Enna">Enna</option>
                    <option translate="no" value="province=Fermo">Fermo</option>
                    <option translate="no" value="province=Ferrara">Ferrara</option>
                    <option translate="no" value="province=Firenze">Firenze</option>
                    <option translate="no" value="province=Foggia">Foggia</option>
                    <option translate="no" value="province=Forlí">Forlí</option>
                    <option translate="no" value="province=Crotone">Crotone</option>
                    <option translate="no" value="province=Frosione">Frosione</option>
                    <option translate="no" value="province=Genova">Genova</option>
                    <option translate="no" value="province=Gorizia">Gorizia</option>
                    <option translate="no" value="province=Grosseto">Grosseto</option>
                    <option translate="no" value="province=Imperia">Imperia</option>
                    <option translate="no" value="province=L'Aquila">L'Aquila</option>
                    <option translate="no" value="province=La Spezia">La Spezia</option>
                    <option translate="no" value="province=Latina">Latina</option>
                    <option translate="no" value="province=Lecce">Lecce</option>
                    <option translate="no" value="province=Lecco">Lecco</option>
                    <option translate="no" value="province=Livorno">Livorno</option>
                    <option translate="no" value="province=Lodi">Lodi</option>
                    <option translate="no" value="province=Lucca">Lucca</option>
                    <option translate="no" value="province=Macerata">Macerata</option>
                    <option translate="no" value="province=Mantova">Mantova</option>
                    <option translate="no" value="province=Massa Carrara">Massa Carrara</option>
                    <option translate="no" value="province=Matera">Matera</option>
                    <option translate="no" value="province=Medio Campidano">Medio Campidano</option>
                    <option translate="no" value="province=Messina">Messina</option>
                    <option translate="no" value="province=Milano">Milano</option>
                    <option translate="no" value="province=Modena">Modena</option>
                    <option translate="no" value="province=Monza">Monza</option>
                    <option translate="no" value="province=Napoli">Napoli</option>
                    <option translate="no" value="province=Novara">Novara</option>
                    <option translate="no" value="province=Nuoro">Nuoro</option>
                    <option translate="no" value="province=Ogliastra">Ogliastra</option>
                    <option translate="no" value="province=Olbia Tempio">Olbia Tempio</option>
                    <option translate="no" value="province=Oristano">Oristano</option>
                    <option translate="no" value="province=Padova">Padova</option>
                    <option translate="no" value="province=Palermo">Palermo</option>
                    <option translate="no" value="province=Parma">Parma</option>
                    <option translate="no" value="province=Pavia">Pavia</option>
                    <option translate="no" value="province=Perugia">Perugia</option>
                    <option translate="no" value="province=Pescara">Pescara</option>
                    <option translate="no" value="province=Piacenza">Piacenza</option>
                    <option translate="no" value="province=Pisa">Pisa</option>
                    <option translate="no" value="province=Pistoia">Pistoia</option>
                    <option translate="no" value="province=Pordenone">Pordenone</option>
                    <option translate="no" value="province=Potenza">Potenza</option>
                    <option translate="no" value="province=Prato">Prato</option>
                    <option translate="no" value="province=Ragusa">Ragusa</option>
                    <option translate="no" value="province=Ravenna">Ravenna</option>
                    <option translate="no" value="province=Reggio Calabria">Reggio Calabria</option>
                    <option translate="no" value="province=R. Emilia">R. Emilia</option>
                    <option translate="no" value="province=Rieti">Rieti</option>
                    <option translate="no" value="province=Rimini">Rimini</option>
                    <option translate="no" value="province=Roma">Roma</option>
                    <option translate="no" value="province=Salerno">Salerno</option>
                    <option translate="no" value="province=Sassari">Sassari</option>
                    <option translate="no" value="province=Savona">Savona</option>
                    <option translate="no" value="province=Siena">Siena</option>
                    <option translate="no" value="province=Siracusa">Siracusa</option>
                    <option translate="no" value="province=Sondrio">Sondrio</option>
                    <option translate="no" value="province=Taranto">Taranto</option>
                    <option translate="no" value="province=Teramo">Teramo</option>
                    <option translate="no" value="province=Terni">Terni</option>
                    <option translate="no" value="province=Torino">Torino</option>
                    <option translate="no" value="province=Trapani">Trapani</option>
                    <option translate="no" value="province=Trento">Trento</option>
                    <option translate="no" value="province=Treviso">Treviso</option>
                    <option translate="no" value="province=Trieste">Trieste</option>
                    <option translate="no" value="province=Udine">Udine</option>
                    <option translate="no" value="province=Urbino">Urbino</option>
                    <option translate="no" value="province=Varese">Varese</option>
                    <option translate="no" value="province=Venezia">Venezia</option>
                    <option translate="no" value="province=Verbania">Verbania</option>
                    <option translate="no" value="province=Vercelli">Vercelli</option>
                    <option translate="no" value="province=Verona">Verona</option>
                    <option translate="no" value="province=Vibo Valentia">Vibo Valentia</option>
                    <option translate="no" value="province=Vicenza">Vicenza</option>
                    <option translate="no" value="province=Viterbo">Viterbo</option>
                </select>
            </div>

           <input type="text" value={search} placeholder="Ricerca per titolo"
           onChange={e => setSearch(e.target.value.toLocaleLowerCase())}/>

            <div className="row sort">
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value=''>Più recente</option>
                    <option value='sort=oldest'>Il più vecchio</option>
                </select>
            </div>
        </div>
    )
}

export default Filters 