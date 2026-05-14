import React, { useState, useEffect } from "react"
import vactData from '../../jsons/vactines.json' 
import "./main.css"
import { Link } from 'react-router-dom'
import { Ruad } from '../utils/ruad'

import vac from "../../img/card.svg"
import cal from "../../img/calendar.svg"
import mai from "../../img/main.svg"
import maimin from "../../img/minMain.svg"


const Main = () => {

    const [filters, setFilters] = useState({old: false, child: false, spec:true});
    const [filteredData, setFilteredData] = useState(vactData);
    const [filteredDataCM, setFilteredDataCM] = useState(vactData);

    const [search, setSearch] = useState("");
    const [active, setActive] = useState("vac");
    const [classVac, SetclassVac] = useState("displayFlex vactins__string");
    const [classCal, SetclassCal] = useState("displayNone vactins__table");
    


    const [couMass, setCouMass] = useState([]);




    useEffect(() => {
        let vactmass = [];
        let raw_schedule;
        let massrisk = ''
        let masstyperuad = "";

        vactData.forEach((vaccine) => {
            if(vaccine.raw_schedule){
                raw_schedule = vaccine.raw_schedule;
                raw_schedule.forEach((raw) => {
                    if (raw.risk=="standart"){
                        massrisk = "для людей вне группы риска"
                    }else if (raw.risk=="risk"){
                        massrisk = "для людей в группе риска"
                    }else{
                        massrisk = "для людей в группе риска и вне группы риска"
                    }

                    masstyperuad=Ruad(raw.type, raw.value)

                    vactmass.push({"massid":vaccine.id, "massname": vaccine.name, "massrisk":raw.risk, "massriskstring": massrisk, "masstyperuad":masstyperuad, "masstype": raw.type, "massval": raw.value, "type":vaccine.type, "legal_capacity":vaccine.legal_capacity, "masstext":raw.text});
                })
            }
        })

        const typeOrder = { "day": 1, "month": 2, "year": 3 };
    


        let vactmass2 = [];

        function Group(vactmass) {
            const groups = new Map();
            
            vactmass.forEach(item => {
                const key = `${item.massname}|${item.massid}|${item.masstype}|${item.massrisk}|${item.type}|${item.legal_capacity}|${item.massriskstring}|${item.masstext}`;
                
                if (!groups.has(key)) {
                    groups.set(key, {
                        massid: item.massid,
                        massname: item.massname,
                        massrisk: item.massrisk,
                        masstype: item.masstype,
                        type: item.type,
                        legal_capacity: item.legal_capacity,
                        massriskstring: item.massriskstring,
                        masstyperuad: item.masstyperuad,
                        masstext: item.masstext,
                        values: [item.massval]
                    });
                } else {
                    groups.get(key).values.push(item.massval);
                }
            });

            for (const group of groups.values()) {
                const sortedValues = group.values.sort((a, b) => a - b);
                const ranges = [];
                let start = sortedValues[0];
                let end = sortedValues[0];
                
                for (let i = 1; i <= sortedValues.length; i++) {
                    if (i < sortedValues.length && sortedValues[i] === end + 1) {
                        end = sortedValues[i];
                    } else {
                        if (start === end) {
                            ranges.push(`${start}`);
                        } else {
                            ranges.push(`${start}-${end}`);
                        }
                        if (i < sortedValues.length) {
                            start = sortedValues[i];
                            end = sortedValues[i];
                        }
                    }
                }
                
                ranges.forEach(range => {

                    let lastNumber;
                    let firstNumber;
                    if (range.includes('-')) {
                        lastNumber = parseInt(range.split('-')[1], 10);
                        firstNumber = parseInt(range.split('-')[0], 10);
                    } else {
                        lastNumber = parseInt(range, 10);
                        firstNumber = parseInt(range, 10);
                    }

                    let ruad=Ruad(lastNumber, group.masstype)

                    vactmass2.push({
                        "massid": group.massid,
                        "massname": group.massname,
                        "massrisk": group.massrisk,
                        "masstyperuad": range + " " + ruad,
                        "masstype": group.masstype,
                        "massval": firstNumber,
                        "type": group.type,
                        "legal_capacity": group.legal_capacity,
                        "massriskstring": group.massriskstring,
                        "masstext":group.masstext
                    });
                });
            }
        }

        Group(vactmass);

        vactmass2 = [...vactmass2].sort((a, b) => {
            if (typeOrder[a.masstype] !== typeOrder[b.masstype]) {
                return typeOrder[a.masstype] - typeOrder[b.masstype];
            }
            return a.massval - b.massval;
        });
        

        setCouMass(vactmass2)

    }, []);


    useEffect(() => {
        applyFilters();
    }, [filters, search, couMass]);


    const applyFilters = () => {

        let filtered = vactData;
        let filteredCM = couMass;

        if (filters.old && !filters.child) {
            filtered = vactData.filter(item => item.legal_capacity === "взрослые");
            filteredCM  = couMass.filter(item => item.legal_capacity === "взрослые");
        } else if (filters.child && !filters.old) {
            filtered = vactData.filter(item => item.legal_capacity === "детские");
            filteredCM  = couMass.filter(item => item.legal_capacity === "детские");
        } else if (filters.old && filters.child) {
            filtered = vactData;
            filteredCM  = couMass;
        } else {
            filtered = vactData;
            filteredCM  = couMass;
        }

        if(!filters.spec){
            filtered = filtered.filter(item => item.type === "обязательные");
            filteredCM  = filteredCM .filter(item => item.type === "обязательные");
        }

        if (search.trim() !== "") {
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        filteredCM  = filteredCM .filter(item =>
            item.massname.toLowerCase().includes(search.toLowerCase())
        );
    }

        let vra=""
        let va=""
        filtered.forEach((vd)=>{
            couMass.forEach((cm)=>{
                if(cm.massid==vd.id){
                    if(cm.massrisk=="standart" || cm.massrisk=="all"){
                        va=va+cm.masstyperuad+" ";
                    }
                    if(cm.massrisk=="risk" || cm.massrisk=="all"){
                        vra=vra+cm.masstyperuad+" ";
                    }
                }
            })
            vd.vaccination_age = va
            vd.vaccination_risk_age = vra
            va=""
            vra=""
        })

        setFilteredData(filtered);
        setFilteredDataCM(filteredCM);
    }

    useEffect(() => {
        if(active=="vac"){
            SetclassVac("displayFlex vactins__string");
            SetclassCal("displayNone vactins__table");
        }else{
            SetclassVac("displayNone vactins__string");
            SetclassCal("displayFlex vactins__table");
        }
    }, [active])

    return(
        <div className="main">

            <div className="vactins__first">
                <div className="vactin__first__text">
                    <h2 className="vactin__first__text-title">Почему важно не пропускать сроки вакцинации?</h2>
                    <p className="vactin__first__text-text">Существует  несколько причин от личных до общественных, начнём с личных</p>
                    <p className="vactin__first__text-text">Прежде всего нужно понять, что антитела не бесконечны, и заканчиваются, если не проведены необходимые прививки. Если  понадобится возобновить цикл прививок - несомненно будет сложнее, прежде всего для организма. Вследствие этого в уязвимый период организм становится лёгкой целью для вирусов, и болезнь может застать в самый неподходящий момент. Разумеется, прививка не стопроцентный горант здоровья, но вероятность болезни,и, что не менее важно - осложнений значительно снижаются.</p>
                    <p className="vactin__first__text-text">Из этого вытекает и общественная причина - коллективный иммунитет. Если организм сильный, то он сможет справиться с болезнью почти незаметно для его обладателя, но болеющий человек чаще всего не находится в изоляции - он контактирует в том числе с лудьми, находящимися в группе риска или просто с ослабленным именитетом</p>
                    <Link to={`/calculate`} className="vactin__first__text-link">Узнайте какие прививки вам нужно сделать в этом году</Link>
                </div>
                <img src={mai} alt="" className="vactins__first-img"/>
                <img src={maimin} alt="" className="vactins__first-img-min"/>
            </div>
        <div className="container">
        <div className="vactins">


            <div className="vactins__filtr">
                <div className="vactins__filtr-filtr">

                    <div className="switch-group">
                    <label className="switch-option">
                        <input type="radio" name="options" value="vac" id="vac" checked={active=="vac"} className="switch-input" onChange={(e) => setActive(e.target.value)}/>
                        <img src={vac} alt=""  className={active=="vac"? "switch-img switch-img-activ" : "switch-img"} />
                    </label>
                    <label className="switch-option">
                        <input type="radio" name="options" value="cal" id="cal" checked={active=="cal"} className="switch-input" onChange={(e) => setActive(e.target.value)}/>
                        <img src={cal} alt="" className={active=="cal"? "switch-img switch-img-activ" : "switch-img"} />
                    </label>
                    </div>

                    <label htmlFor="old" className={filters.old ? "vactins__main-green--active vactins__main-green" : "vactins__main-green"}>взрослые</label>
                    <input type="checkbox" name="filtr" id="old" checked={filters.old} 
                    onChange={(e) => setFilters({
                                    ...filters,
                                    old: !filters.old
                                })} 
                                 className="none"/>
                    <label htmlFor="child" className={filters.child ? "vactins__main-orange--active vactins__main-orange" : "vactins__main-orange"}>детские</label>
                    <input type="checkbox" name="filtr" id="child" checked={filters.child}  
                    onChange={(e) => setFilters({
                                    ...filters,
                                    child: !filters.child
                                })}  className="none"/>

                    <div className="vactins__filtr-filtr-spec">
                        <input type="checkbox" name="filtr" id="spec" checked={filters.spec}  
                    onChange={(e) => setFilters({
                                    ...filters,
                                    spec: !filters.spec
                                })}  />
                        <label htmlFor="spec">необязательные</label>
                    </div>
                </div>
                <div className="vactins__filtr-search">
                    <input type="text" className="vactins__search__green" onChange={(e) => setSearch(e.target.value)}/>
                    <input type="submit" value="Найти" onClick={() => applyFilters()} className="vactins__search__orange"/>
                </div>
            </div>



            
            <div className={classVac}>
            {filteredData.map((vaccine) => (
                <div key={vaccine.id}  style={{ position: 'relative' }}>
                    <div className="vactins__main">
                        <h2><Link to={`/vactina/${vaccine.id}`}  target="_blank">{vaccine.name}</Link></h2>
                        <div className="vactins__main-p" >
                            <p className={vaccine.legal_capacity === "детские" ? 'vactins__main-lior' : 'vactins__main-ligr'}>{"•"+vaccine.legal_capacity}</p>
                            <p  className={vaccine.type === "обязательные" ? 'vactins__main-lior' : 'vactins__main-ligr'}>{"•"+vaccine.type}</p>
                        </div>
                    </div>
                        {vaccine.raw_schedule?(
                    <div className="vactins__dops">
                        <div className="vactine__dops__dop">
                            <p className="vactine__dops__dop-title">Возраст стандартной вакцинации: <span  className="vactine__dops__dop-info">{vaccine.vaccination_age}</span></p>
                            {/* <p  className="vactine__dops__dop-info"> {vaccine.vaccination_age}</p> */}
                        </div>
                        <div className="vactine__dops__dop">
                            <p className="vactine__dops__dop-title">Возраст вакцинации людей, находящихся в группе риска: <span  className="vactine__dops__dop-info">{vaccine.vaccination_risk_age}</span></p>
                            {/* <p  className="vactine__dops__dop-info"> {vaccine.vaccination_risk_age}</p> */}
                        </div>
                        <div className="vactine__dops__dop">
                            <p className="vactine__dops__dop-title">Регулярность: <span  className="vactine__dops__dop-info">{vaccine.regul}</span></p>
                            {/* <p  className="vactine__dops__dop-info"> {vaccine.regul}</p> */}
                        </div>
                    </div>
                        ):(
                    <div className="vactins__dops">
                        <div className="vactine__dops__dop">
                            <p className="vactine__dops__dop-title">Возраст вакцинации: <span className="vactine__dops__dop-info">{vaccine.raw_schedule_text}</span></p>
                        </div>
                        <div className="vactine__dops__dop">
                            <p className="vactine__dops__dop-title">Регулярность: <span className="vactine__dops__dop-info">{vaccine.regul}</span></p>
                            {/* <p  className="vactine__dops__dop-info"> {vaccine.regul}</p> */}
                        </div>
                    </div>
                        )}

                    <Link to={`/vactina/${vaccine.id}`} className="link"  target="_blank">узнать больше</Link>
                </div>
            ))}

            </div>

            <table className={classCal}>
            {filteredDataCM.map((vaccine, index) => (
                <tr key={index} className="vactins__table__tr">
			        <td className="vactins__table__typeruad">{vaccine.masstyperuad}</td>
                    <div className="vactins__table__flex">
                        <div className="vactins__main">
                            <td ><Link to={`/vactina/${vaccine.massid}`} className="vactins__table__flex-name"  target="_blank">{vaccine.massname}</Link></td>
                            <td className={vaccine.type === "обязательные" ? 'vactins__main-lior' : 'vactins__main-ligr'}>{"•"+vaccine.type}</td>
                        </div>
                        <td className="vactins__table__flex-risk">{vaccine.massriskstring}. {vaccine.masstext}</td>
                    </div>
		        </tr>  
            ))}
            </table>
            
        </div>
        </div>
        </div>
    )
}

export default Main