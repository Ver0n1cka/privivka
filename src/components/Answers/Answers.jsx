import React, { useState, useEffect } from "react"
import "./answers.css"
import suitcase from "../../img/answers/suitcase.svg"
import gavel from "../../img/answers/gavel.svg"
import unicorn from "../../img/answers/unicorn.svg"
import person from "../../img/answers/person.svg"
import vactData from '../../jsons/answers.json'
import question from "../../img/answers/question.svg"
import parent from "../../img/answers/parent.svg" 
import { Link } from 'react-router-dom'


const Answers = () => {
    const [filters, setFilters] = useState("all");
    const [filteredData, setFilteredData] = useState(vactData);
    const [search, setSearch] = useState("");
    const categoryIcons = {
        "родителям": parent,
        "правовые": gavel, // или другая иконка
        "взрослым": person,
        "путешествия": suitcase,
        "мифы": unicorn,
        "другое": question
    }
    useEffect(() => {
            applyFilters();
        }, [filters, search]);
    const applyFilters = () => {
        let filtered = vactData;
         switch(filters) {
            case "other":
                filtered = vactData.filter(item => item.cat === "другое");
                break;
            case "parents":
                filtered = vactData.filter(item => item.cat === "родителям");
                break;
            case "low":
                filtered = vactData.filter(item => item.cat === "правовые");
                break;
            case "olds":
                filtered = vactData.filter(item => item.cat === "взрослым");
                break;
            case "visits":
                filtered = vactData.filter(item => item.cat === "путешествия");
                break;
            case "mif":
                filtered = vactData.filter(item => item.cat === "мифы");
                break;
            case "all":
                filtered = vactData;
            default:
                filtered = vactData;
        }
        if (search.trim() !== "") {
        filtered = filtered.filter(item =>
            item.qus.toLowerCase().includes(search.toLowerCase())
        );
    }
        setFilteredData(filtered);
    }


    return(
        <>
        <div className="main">
        <div className="container">
            <div className="vactins">

            <div className="vactins__filtr">
                <div className="vactins__filtr-filtr">

                    <label htmlFor="all" className={filters==="all" ? "vactins__main-orange--active vactins__main-orange" : "vactins__main-orange"}>Все</label>
                    <input type="radio" name="filtr" id="all" checked={filters === "all"} 
                    onClick={() => setFilters("all")}  className="none"/>

                    <label htmlFor="parents" className={filters==="parents" ? "vactins__main-green--active vactins__main-green" : "vactins__main-green"}>родителям</label>
                    <input type="radio" name="filtr" id="parents" checked={filters === "parents"}
                    onClick={() => setFilters("parents")}   className="none"/>
                    
                    
                    {/* <label htmlFor="low" className={filters==="low" ? "vactins__main-green--active vactins__main-green" : "vactins__main-green"}>правовые</label>
                    <input type="radio" name="filtr" id="low" checked={filters === "low"} 
                    onClick={() => setFilters("low")}   className="none"/> */}
                    
                    
                    <label htmlFor="olds" className={filters==="olds" ? "vactins__main-green--active vactins__main-green" : "vactins__main-green"}>взрослые</label>
                    <input type="radio" name="filtr" id="olds" checked={filters === "olds"} 
                    onClick={() => setFilters("olds")}   className="none"/>
                    

                    <label htmlFor="visits" className={filters==="visits" ? "vactins__main-green--active vactins__main-green" : "vactins__main-green"}>путешествия</label>
                    <input type="radio" name="filtr" id="visits" checked={filters === "visits"} 
                    onClick={() => setFilters("visits")}   className="none"/>
                    
                    

                    <label htmlFor="mif" className={filters==="mif" ? "vactins__main-green--active vactins__main-green" : "vactins__main-green"}>мифы</label>
                    <input type="radio" name="filtr" id="mif" checked={filters === "mif"} 
                    onClick={() => setFilters("mif")}   className="none"/>
                    
                    
                    <label htmlFor="other" className={filters==="other" ? "vactins__main-green--active vactins__main-green" : "vactins__main-green"}>другие</label>
                    <input type="radio" name="filtr" id="other" checked={filters === "other"} 
                    onClick={() => setFilters("other")}   className="none"/>
                </div>
                <div className="vactins__filtr-search">
                    <input type="text" className="vactins__search__green" onChange={(e) => setSearch(e.target.value)}/>
                    <input type="submit" value="Найти" onClick={() => applyFilters()} className="vactins__search__orange"/>
                </div>
            </div>
        {filteredData.map((ans) => (
            <div key={ans.id} className="ans">
                <div className="ans__flex">
                    <img src={categoryIcons[ans.cat] || question} />
                    <p className="qus">{ans.qus}</p>
                </div>
                <p className="sol">
                    {ans.sol_parts.map((part, idx) => {
                        if (typeof part === 'string') {
                            return part;
                        }
                        if (part.type === 'link') {
                            return (
                                <Link key={idx} to={part.to} className='vactins__main-ligr'>
                                    {part.text}
                                </Link>
                            );
                        }
                        return null;
                    })}
                </p>
            </div>
        ))}
        </div>
        </div>
        </div>
        </>
    )
}

export default Answers