import React, { useState, useEffect } from "react"
import "./articles.css"
import vactData from '../../jsons/articles.json' 
import { Link } from 'react-router-dom'

const Articles = () => {
    const [filters, setFilters] = useState("all");
        const [filteredData, setFilteredData] = useState(vactData);
        const [search, setSearch] = useState("");

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
                item.tit.toLowerCase().includes(search.toLowerCase())
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
            <div className="art__grid">
                    
            {filteredData.slice().reverse().map((art) => (
                <Link to={`/articles/${art.id}`} key={art.id} className="art">
                    <p className="art__tit">{art.tit}</p>
                    <img className="art__img" src={art.img} />
                    <p className="art__cat">{art.cat}</p>
                </Link>
            ))}
                </div>
            </div>
            </div>
            </div>
            </>
        )
}

export default Articles