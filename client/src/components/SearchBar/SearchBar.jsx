import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getRecipesByName } from '../../redux/actions/actions';
import './SearchBar.css';

export default function Search ({setSearch}) {
    const [nameSearch, setNameSearch] = useState('');
    const dispatch = useDispatch();

    function handleChange(e) {
        setNameSearch(e.target.value)
    }

    function handleSubmit(e) {
        if(nameSearch){
            e.preventDefault();
            dispatch(getRecipesByName(nameSearch))
            setSearch(true)
            setNameSearch('')
        }else{
            e.preventDefault();
            setSearch(false)
        }
    }

    return (
        <React.Fragment>
            <form  onSubmit={handleSubmit} className='search-bar'>
                <input className='inp-sch' type='text' placeholder='Search' value={nameSearch} onChange={handleChange}/>
                <button className='btn-sch' type='submit'>Search</button>
            </form>
        </React.Fragment>
    );
}