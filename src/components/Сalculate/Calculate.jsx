import React, { useState, useRef } from 'react';
import vactData from '../../jsons/vactines.json' 
import "./calculate.css"
import { Link } from 'react-router-dom'
import { Ruad } from '../utils/ruad'

const Calculate = () => {
    const [WRD, SetWRD] = useState("");
    const [Mass, SetMass] = useState([]);
    const [Itog, SetItog] = useState("");
    const inputRef = useRef(null);

function getType(birthDateValue) {
    const birthDate = new Date(birthDateValue);
    const today = new Date();
    let findType = "";
    let findVal = 0;

    if (isNaN(birthDate.getTime())) {
        SetWRD("Введите корректную дату");
        SetMass([]);
        return;
    } else if (birthDate > today) {
        SetWRD("дата должна быть меньше сегодняшнего дня");
        SetMass([]);
        return;
    } else if (birthDateValue === "") {
        SetWRD("Введите дату");
        SetMass([]);
        return;
    } else if ((today.getFullYear()-birthDate.getFullYear())>130) {
        SetWRD("Указанный возраст превышает максимально допустимое значение (130 лет). Пожалуйста, проверьте корректность даты рождения.");
        SetMass([]);
        return;
    } else {
        SetWRD("");
        
        let years = today.getFullYear() - birthDate.getFullYear();
        // Проверяем, был ли уже день рождения в этом году
        if (today.getMonth() < birthDate.getMonth() || 
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            years--;
        }
        
        if (years < 3) {
            let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
            months += today.getMonth() - birthDate.getMonth();
            
            if (today.getDate() < birthDate.getDate()) {
                months--;
            }
            if (months == 0) {
                let days = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
                findType = "day";
                findVal = days;
            } else {
                findType = "month";
                findVal = months;
            }
        } else {
            findType = "year";
            findVal = years;
        }
        let valNa = Ruad(findVal, findType);
        SetMass([]);
        SetItog("На момент " + findVal + " " + valNa + " должны быть сделаны следующие прививки:");
        getVact(findType, findVal, valNa);
    }
}


    function getVact(findType, findVal, valNa){
        let vaMass=[];
        let type = "";
        let val = 0;
        let raw_schedule;
        let name = "";
        let text = "";
        let id = 0;
        let vacrisk = "для людей в группе риска и вне группы риска";
        vactData.map((vaccine) => {
            name = vaccine.name;
            id = vaccine.id;
            if(vaccine.raw_schedule){
                raw_schedule = vaccine.raw_schedule;
                raw_schedule.map((raw) => {
                    type=raw.type;
                    val=raw.value;
                    if (raw.risk=="standart"){
                        vacrisk = "для людей вне группы риска"
                    }else if (raw.risk=="risk"){
                        vacrisk = "для людей в группе риска"
                    }else{
                        vacrisk = "для людей в группе риска и вне группы риска"
                    }
                    if(findType==type && findVal==val){
                        text=raw.text;
                        vaMass.push({"vacid":id, "vacname": name, "vactext": text, "vacrisk": vacrisk});
                    }
                })
            }
        })

        let grip=vactData.find(item => item.id === parseInt(8));
        if((findType=="month" && findVal<12)||(findVal=="day")){
        }else{
            vaMass.push({"vacid":grip.id, "vacname": grip.name, "vactext": "вакцина делается каждый год", "vacrisk": "для людей в группе риска и вне группы риска"});
        }
        let disval = findVal % 10;
        let dis=vactData.find(item => item.id === parseInt(4));
        if(findType=="year" && findVal>20 && disval==4){
            vaMass.push({"vacid":dis.id, "vacname": dis.name, "vactext": "Вакцина вводится через десять лет после последней прививки", "vacrisk": "для людей в группе риска и вне группы риска"});
        }
        let cltshval = (findVal -2)% 3
        let clesh=vactData.find(item => item.id === parseInt(12));
        if(findType=="year" && cltshval==0 ){
            vaMass.push({"vacid":clesh.id, "vacname": clesh.name, "vactext": "Вакцина вводится через три года после последней прививки", "vacrisk": "для людей в группе риска и вне группы риска"});
        }

        SetMass(vaMass)
        if (Mass.length===0){
            SetWRD("Похоже вам не требуется делать прививок в " + findVal + " " + valNa)
        }else{
            SetWRD("");
        }
    }



        // alert("samenamena")
    return(
        <>
            <div className="main">
                <div className="container">
                    <div className="calcylate">
                        <div className="calcylate-search">
                            <input type="date" className="vactins__search__green"  ref={inputRef} />
                            <input type="submit" value="Найти" onClick={() => getType(inputRef.current.value)} className="vactins__search__orange"/>
                        </div>
                        <div className="calcylate__vactine">
                            {Mass.length === 0 ? (
                                <p className='calcylate-wrd'>{WRD}</p>
                            ) : (
                                <>
                                <h2 className="calcylate__itog">{Itog}</h2>
                                {
                                    Mass.map((mas) => (
                                        <div key={mas.vacid} className="calcylate__vactine-item" >
                                            <h3 className="calcylate__vactine-vactin">{mas.vacname}</h3>
                                            <p className="calcylate__vactine-text">{mas.vactext} {mas.vacrisk}</p>
                                            <Link to={`/vactina/${mas.vacid}`} className="calculate-link">узнать больше о вакцине</Link>
                                        </div>
                                    ))
                                }
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calculate