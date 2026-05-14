import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import vactData from '../../jsons/vactines.json';
import './vactine.css';

import { Ruad } from '../utils/ruad'

import d from "../../img/vactine/danger.svg"
import pa from "../../img/vactine/plus-add.svg"
import pw from "../../img/vactine/plus-window.svg"
import sp from "../../img/vactine/shield-plus.svg"
import t from "../../img/vactine/thermometer.svg"

const Vactine = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const vaccine = vactData.find(item => item.id === parseInt(id));

    const [standart, setStandart] = useState("");
    const [risk, setRisk] = useState("");

    useEffect(()=>{
    if (!vaccine) return;
    let standartmass = [];
    let riskmass = [];
    

    if(raw_schedule){
        raw_schedule.forEach((raw) => {
            if (raw.risk == "standart" || raw.risk == "all") {
                standartmass.push({ "ty": raw.type, "va": raw.value, "ruad": raw.ruad, "text": raw.text });
            }
            if (raw.risk == "risk" || raw.risk == "all") {
                riskmass.push({ "ty": raw.type, "va": raw.value, "ruad": raw.ruad, "text": raw.text });
            }
        });
    }


    function Group(mass, vty) {
        let filtered = mass.filter(item => item.ty === vty);
        
        if (filtered.length === 0) return "";
        
        let sorted = [...filtered].sort((a, b) => a.va - b.va);
        
        let ranges = [];
        let start = sorted[0];
        let end = sorted[0];
        
        for (let i = 1; i <= sorted.length; i++) {
            if (i < sorted.length && sorted[i].va === end.va + 1  && sorted[i].text===end.text) {
                end = sorted[i];
            } else {
                if (start.va === end.va) {
                    let ruad = Ruad(start.va, start.ty);
                    ranges.push(`${start.va}${ruad}`);
                } else {
                    let ruad = Ruad(end.va, end.ty);
                    ranges.push(`${start.va}-${end.va}${ruad}`);
                }
                
                if (i < sorted.length) {
                    start = sorted[i];
                    end = sorted[i];
                }
            }
        }
        
        return ranges.join(", ");
    }


    let standartTypes = [...new Set(standartmass.map(v => v.ty))];
    let riskTypes = [...new Set(riskmass.map(v => v.ty))];
    
    let standartmass2 = "";
    let riskmass2 = "";
    
    standartTypes.forEach(type => {
        let result = Group(standartmass, type);
        if (result) {
            standartmass2 += (standartmass2 ? ", " : "") + result;
        }
    });
    
    riskTypes.forEach(type => {
        let result = Group(riskmass, type);
        if (result) {
            riskmass2 += (riskmass2 ? ", " : "") + result;
        }
    });

    setStandart(standartmass2);
    setRisk(riskmass2);
    },[vaccine])

    
    
    try {
        if (!vaccine)
            { throw new Error('Статья не найдена')}
    } catch (error) {
        return (
            <div className="main">
                <div className="container">
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <h2 className='vactine__vactina-title'>Вакцина не найдена</h2>
                        <p>
                            Такой вакцины не существует или она была удалена
                        </p>
                        <button 
                            onClick={() => navigate('/')}
                            className="vactins__main-green"
                            style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}
                        >
                            На главную
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    
    const risc = vaccine.group_risk;
    const contra= vaccine.contraindications;
    const oft= vaccine.ofteneffects;
    const rare= vaccine.rareeffects;
    const save= vaccine.save;
    const raw_schedule = vaccine.raw_schedule;




    return (
        <div className="main">
            <div className="container">
                <div className="vactina">
                    <div className="vactins__main">
                    <h1>{vaccine.name}</h1>
                    <div className="vactins__main-p" >
                        <p className={vaccine.type === "обязательные" ? 'vactins__main-lior' : 'vactins__main-ligr'}>{vaccine.type}</p>
                        <p className={vaccine.legal_capacity === "детские" ? 'vactins__main-lior' : 'vactins__main-ligr'} >{vaccine.legal_capacity}</p>
                    </div>
                </div>
                    <div className="vactins__vactina">
                        {raw_schedule?(
                            <div className="vactine__vactina-info two-cell"> 
                                
                                <div className="flex">
                                    <img src={pa} alt="" />
                                <p className="vactine__vactina-title">Когда делать</p>
                                </div>
                                <p>График для людей вне группы риска {standart}</p>
                                <p>График для людей в группе риска {risk}</p>
                                <p>Регулярность: {vaccine.regul}</p>
                                
                            </div>
                        ):(
                            <div className="vactine__vactina-info two-cell"> 
                                <div className="flex">
                                    <img src={pa} alt="" />
                                <p className="vactine__vactina-title">Когда делать</p>
                                </div>
                                <p>График: {vaccine.raw_schedule_text}</p>
                                <p>Регулярность: {vaccine.regul}</p>
                            </div>
                        )}


                            <div className="vactine__vactina-info"> 
                                <div className="flex">
                                    <img src={pw} alt="" />
                                    <p className="vactine__vactina-title">Группы риска</p>
                                </div>

                                <div className="vactine__vactina-map">
                                {risc.map((ris) => (
                                <p>{ris}</p>
                                ))}
                                </div>
                            </div>


                            <div className="vactine__vactina-info">
                                <div className="flex">
                                    <img src={d} alt="" />
                                    <p className="vactine__vactina-title-orange">Противопоказания</p>
                                </div> 
                                
                                <div className="vactine__vactina-map">
                                {contra.map((cont) => (
                                <p>{cont}</p>
                                ))}
                                </div>
                            </div>


                            <div className="vactine__vactina-info two-cell">
                                <div className="flex">
                                    <img src={sp} alt="" />
                                    <p className="vactine__vactina-title">Возможные побочные эффекты</p>
                                </div> 
                                
                                <div className="vactine__vactina-map-grid">
                                    <div className="">
                                        <p  className="vactine__vactina-subtitle">Частыe</p>
                                        {oft.map((cont) => (
                                        <p>{cont}</p>
                                        ))}
                                    </div>
                                    <div className="">
                                        <p  className="vactine__vactina-subtitle">Редкие</p>
                                        {rare.map((cont) => (
                                        <p>{cont}</p>
                                        ))}
                                    </div>
                                    
                                </div>
                            </div>


                            <div className="vactine__vactina-info">
                                <div className="flex">
                                    <img src={t} alt="" />
                                    <p className="vactine__vactina-title-orange">Условия хранения</p>
                                </div> 
                                
                                <div className="vactine__vactina-map">
                                {save.map((cont) => (
                                <p>{cont}</p>
                                ))}
                                </div>
                            </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Vactine;