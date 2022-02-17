import '../pages/general.css'
import "../../node_modules/react-datetime/css/react-datetime.css"

import React, {useEffect, useState} from 'react'

import Datetime from 'react-datetime';
import Modal from "react-modal"



function AgregarEvento({isOpen, onClose, onEventAdded, info}) {
    const [title, setTitle] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [spaceId, setspaceId] = useState("");
    const [modalOpen, setModalOpen] = useState(false)

    let isOpenAgregarEvento = false;

    const onSubmit = (e) => {
        e.preventDefault()
       
        onEventAdded({

            start,
            end
        })
        onClose()
        
    }

    const openModalReservar = () => {
        console.log('isOpenAgregarEvento', isOpenAgregarEvento);
        isOpenAgregarEvento=true;
        setModalOpen(true);

    }

    return (
        <div className='modalStyle'>

            <Modal isOpen={isOpen} onRequestClose={onClose}>
            
                    <h5>Terminos y Condiciones</h5>
                    <p>{info.rulesOfUse}</p>
                    <div className="col-6">
                <div className="row ">
                    <p className="Item-Title">Tiempo previo de reserva: <span className="Item-Description">{info.previusReservationTime} hs</span></p>

                    <p className="Item-Title">Horas máximas de reserva: <span className="Item-Description">{info.maximiunReservationTime} hs</span></p>


                    </div>
                </div>
                    <label>
                    Estoy de acuerdo:
                    <input
                        name="isGoing"
                        type="checkbox"
                    />
                </label>
                    <div className='boton-centrar'><button className='btn1 mt-4' onClick={()=> openModalReservar()} >Reservar Espacio</button></div>
                    
               


            </Modal>


            <Modal isOpen={isOpenAgregarEvento} onRequestClose={onClose}>
                <form action="" onSubmit={onSubmit}>
                    <h5>{info.description}</h5>
                    <div>
                        <label htmlFor="" className='Item-Description mt-3'>Inicio</label>
                        <Datetime value={start} onChange={date => setStart(date)} />
                    </div>
                    <div>
                        <label htmlFor="" className='Item-Description mt-3'>Final</label>
                        <Datetime value={end} onChange={date => setEnd(date)} />
                    </div>
                    <div className='boton-centrar'><button className='btn1 mt-4'>Reservar Espacio</button></div>
                </form>
            </Modal>
        </div>
    )
}

export default AgregarEvento
