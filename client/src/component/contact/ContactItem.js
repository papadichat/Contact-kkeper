import React,{Fragment,useContext} from 'react'
import ContactContext from '../../Context/Contact/ContactContext'
import PropTypes from 'prop-types'


export const ContactItem = ({contact}) => {
    const {_id,name,email,phone,type}=contact;

    const contactContext =useContext(ContactContext);
    const {deleteContact,setCurrent,clearCurrent}=contactContext;

    const onDelete =() =>{
        
        deleteContact(_id);
        clearCurrent();

    }

    const onEdit = () =>{
        setCurrent(contact);
    }
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{" "}<span style={{float:'right'}} 
                className={'badge'+' '+(type ==='Professional'?'badge-success':'badge-primary')}>{type}</span>

            </h3>
            <ul className='list'>
                {email && (<li>
                    <i className='fas fa-envelope-open'>{email}</i>
                </li>)}
                {phone && (<li>
                <i className='fas fa-phone'>{phone}</i>
                </li>)}
                

            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={onEdit}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
            
        </div>
    )
};

ContactItem.propTypes={
    contact:PropTypes.object.isRequired
}



export default ContactItem
