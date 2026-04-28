import React, { useState, useRef } from 'react';
import vactData from '../../jsons/vactines.json' 
import "./footer.css"
import { Link } from 'react-router-dom'
import { Ruad } from '../utils/ruad'

const Footer = () => {

    return(
        <>
            <div className="footer">
                    <p className='footer__text'>Календарь прививок · Информация не заменяет консультацию врача</p>
                    <p className='footer__text'>Источник: Минздрав РФ</p>
            </div>
        </>
    )
}

export default Footer