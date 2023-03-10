import React from 'react'

function Footer() {
    return (
        <div className='main-footer'>
            <div className='container'>
                <div className='row'>
                    {/* Column 1 */}
                    <div className='col'>
                        <h4> BUSCOMAS </h4>
                        <ul className='list-unstyled'>
                            <li> Isole Canarie, Spagna </li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div className='col'>
                        <h4> SERVIZI </h4>
                        <ul className='list-unstyled'>
                            <li> Servizio di pubblicitĂ  per massaggi </li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className='col'>
                        <h4> ASSISTENZA </h4>
                        <ul className='list-unstyled'>
                            <li> Contattaci </li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div className='col'>
                        <h4> SOCIAL MEDIA </h4>
                        <ul className='list-unstyled'>
                            <li> Prossimamente... </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <p className='col-sm'>
                        &copy;{new Date().getFullYear()} BUSCOMAS | Tutti i diritti riservati | Termini di servizio | Informativa sulla privacy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer