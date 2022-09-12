import React , { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getAllDiets} from '../../redux/actions/actions';
import validate from './validator';
import './CreateRecipe.css'

export default function Create() {

    const dispatch = useDispatch();
	let d = useSelector(state => state.diet)
	
    const [input,setInput] = useState({
		title: '',
		summary: '',
		healthScore: '',
		analyzedInstructions: '',
		image: '',
		diet: [],
    })
    
    const [errors,setErrors] = useState({});
	
    React.useEffect(()=>{
		dispatch(getAllDiets())
    }, [dispatch])
	
    const handleChange = function (e){
      setInput({
          ...input,
          [e.target.name]: e.target.value
      });

      setErrors(validate({ 
          ...input,
          [e.target.name]: e.target.value
        }));
    }

    const handleChangeDiet = function(e){
        e.preventDefault();

        if(input.diet.length === 0) setInput({ ...input, diet: [...input.diet, e.target.value]})
        else{
            if(input.diet.find(element => element === e.target.value)){   
            }
            else{
            setInput({ ...input, diet: [...input.diet, e.target.value]})}
        }
    }
    

    function handleDelete(e) {
        e.preventDefault();
        setInput({
            ...input,
            diet: input.diet.filter( d => d !== e.target.value)
        })
    };

    let id = 0
    function addKey(){
        return id++
    }

    const val = () =>{
		if(input.title && input.image && input.summary && input.healthScore && input.diet && input.analyzedInstructions){
			return true
		}
		else if(errors.title !== '' || errors.image !== '' || errors.summary !== '' || errors.diet !== '' || errors.healthScore !== '' || errors.analyzedInstructions !== ''){
			return false
			
        }else{
            return 'empty'
        }
    }
	

    function handleSubmit(e) {
        e.preventDefault();
        if(val() === true){
            dispatch(createRecipe(input));
            alert("Recipe was created successfully");
    
            setInput({
            	title: '',
		        summary: '',
		        healthScore: '',
		        analyzedInstructions: '',
		        image: '',
		        diet: [],
            })
        }
        else if (val() === 'empty') {
            (alert('Must complete all the data required.'));
        }
        else (alert('Please complete correctly.'));
    }

    return (
        <div className='containerForm'>
            <h1 className='form-title '>Create your own recipe!</h1>
          <form id="breedForm" className='divForm' onSubmit={handleSubmit}>
            <div>
				<h4>Name</h4>
                <input autoComplete='off' className='inputStyle' type="text" name='title' value={input.title} onChange={handleChange} />
                {errors.title && (<p className='danger'>{errors.title}</p>)}
            </div>
            <div>
                <h4>Summary</h4>
                <input autoComplete='off' className='inputStyle' type="text" name='summary' value={input.summary} onChange={handleChange} />
                {errors.summary && (<p className='danger'>{errors.summary}</p>)}
            </div>
            <div>
                <h4>Health Score</h4>
                <input autoComplete='off' className='inputStyle' type="text" name='healthScore' value={input.healthScore} onChange={handleChange} />
                {errors.healthScore && (<p className='danger'>{errors.healthScore}</p>)}
            </div>
            <div>
                <h4>Instructions</h4>                
                <input autoComplete='off' className='inputStyle' type="text" name='analyzedInstructions' value={input.analyzedInstructions} onChange={handleChange} />
                {errors.analyzedInstructions && (<p className='danger'>{errors.analyzedInstructions}</p>)}
            </div>
            <div>
				<h4>Image</h4>                
                <input autoComplete='off' className='inputStyle' type="text" name='image' placeholder='Paste your image link...' value={input.image} onChange={handleChange} />
                {errors.image && (<p className='danger'>{errors.image}</p>)}
            </div>
            <div>
				<h4>Diet</h4>                 
                    <select onChange={handleChangeDiet} className='tempSelect'>
                        {d && d.map((d) => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                    </select>
            </div>

            <div className='temp' >
                {input.diet.map(e => (
                    <div className='btnT' key={addKey()}>
                        <p>{e}</p>
                        <button className='delete' onClick={handleDelete} value={e}>X</button>
                    </div>
                ))}
            </div>
            <div>
            <button
				className='btn-reset'
				    onClick={(e) => {
						e.preventDefault();
						setInput({title: '',
                        summary: '',
                        healthScore: '',
                        analyzedInstructions: '',
                        image: '',
                        diet: [],});
						setErrors({});
						document.getElementById('breedForm').reset();
						}}
						>
						Reset
						</button>
                <button className='btnS' type='submit' >Create Recipe</button>
            </div>
          </form>
        </div>
    );
}
