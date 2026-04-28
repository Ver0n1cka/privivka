import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import vactData from '../../jsons/articles.json' 
import './article.css';


const ArticlId = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const artic = vactData.find(item => item.id === parseInt(id));

    try {
        if (!artic) throw new Error('Статья не найдена');
    } catch (error) {
        return (
            <div className="main">
                <div className="container">
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <h2 className='articlid__tit'>Статья не найдена</h2>
                        <p className='articlid__text'>
                            Такой статьи не существует или она была удалена
                        </p>
                        <button 
                            onClick={() => navigate('/articles')}
                            className="vactins__main-green"
                            style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}
                        >
                            Вернуться к статьям
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <>
        <div className="main">
            <div className="container">
                <div className="articlid">
                    <p className="articlid__tit">{artic.tit}</p>
                        {artic.text_parts.map((part, idx) => {
                            if (part.type === 'text') {
                                return (
                                <p className="articlid__text">{part.text}</p>
                                )
                            }
                            if (part.type === 'title') {
                                return (
                                <p className="articlid__text_tit">{part.text}</p>
                                );
                            }
                            if (part.type === 'link') {
                                return (
                                    <a href={part.to} className="articlid__text articlid__text-link"  target="_blank">{part.text} <br /></a> 
                                );
                            }
                            return null;
                        })}
                    <p className="articlid__text">{artic.text}</p>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default ArticlId