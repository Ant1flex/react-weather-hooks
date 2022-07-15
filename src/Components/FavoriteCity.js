import React from 'react'
import './styles.css'

function FavoriteCity({index, deleteElement, searchByFavorite, children}){

    const deleteCity = () => {
        deleteElement(index);
    }

    const search = () => {
        searchByFavorite(index)
    }

        return (
            <li className='li'>
                <nobr>
                <button type='submit' className='favElem' onClick={search}>{children}</button>
                <button type='button' className='rm' onClick={deleteCity}>&times;</button>
                </nobr>
            </li>
        );
}

export default FavoriteCity;