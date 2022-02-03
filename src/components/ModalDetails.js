import { Modal } from '@material-ui/core';
import React from 'react'

const ModalDetails = (props)=> {
    
    return (
        <div>      
            <Modal
        open={props.showmodalInsertar}
        onClose={props.functionShow}>
          {props.bodyAgregar}
        </Modal>
        </div>
    )
}

export default ModalDetails
