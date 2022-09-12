import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, switchLoading } from '../../redux/actions/actions';
import Card from '../Card/Card.jsx';
import Search from '../SearchBar/SearchBar';
import notFound from '../../images/notfound.png';
import Loading from '../../images/loading.gif';
import './Home.css';

export default function Home() {
	
	const dispatch = useDispatch();
	const searchRecipes = useSelector((state) => state.recipe);
	const allRecipes = useSelector((state) => state.allRecipes);
	const loading = useSelector((state) => state.loading);
	const [search, setSearch] = useState(false);
	const [page, setPage] = useState(1);
	const [offset, setOffset] = useState(0);
	const [filter, setFilter] = useState('');
	const [recipes, setRecipes] = useState([]);
	const [filteredRecipes, setFilteredRecipes] = useState([]);
	const [orderedRecipes, setOrderedRecipes] = useState([]);

	// ------------- INIT -------------------
	useEffect(() => {
		dispatch(getAllRecipes());
		setTimeout(() => {
			dispatch(switchLoading(false));
		}, 3000);
	}, [dispatch]);

	// ------------- SEARCH -------------------
	useEffect(() => {
		setOrderedRecipes([]);
		setFilteredRecipes([]);
		setOffset(0);
		setPage(1);
		if (search) {
			setTimeout(() => {
				dispatch(switchLoading(false));
			}, 3000);
		}
	}, [dispatch, search, searchRecipes]);

	// ------------- FILTER -------------------
	const filterDiets = function (recipe) {
		let arrayDiets = [];
		if (recipe.diet) {
			for(let i of recipe.diet) {
				typeof i === 'object' ? arrayDiets.push(i.name.toLowerCase()) : arrayDiets.push(i.toLowerCase());
			}
		}
		if (recipe.vegetarian) {
			arrayDiets.push('vegetarian')
		}
		return arrayDiets;
	}

	useEffect(() => {
		setSearch(false);
		setOffset(0);
		setPage(1);
		if (filter) {
			let filterRecipes = [...allRecipes].filter((recipe) =>{
				return (filterDiets(recipe) && filterDiets(recipe).includes(filter.toLowerCase()));
			} 
			);
			filterRecipes.length && setFilteredRecipes(filterRecipes);
		} else {
			setFilteredRecipes([]);
		}
	}, [filter, allRecipes]);

	// ------------- SORT -------------------
	function handleSort(e) {
		if (filteredRecipes.length) {
			if (e.target.value === 'asc') {
				const asc = [...filteredRecipes].sort((a, b) => {
					return a.title.toLowerCase() > b.title.toLowerCase()
						? 1
						: -1;
				});
				setFilteredRecipes(asc);
			}
			if (e.target.value === 'des') {
				const des = [...filteredRecipes].sort((a, b) => {
					return a.title.toLowerCase() < b.title.toLowerCase()
						? 1
						: -1;
				});
				setFilteredRecipes(des);
			}
			if (e.target.value === 'high') {
				const high = [...filteredRecipes].sort((a, b) => {
					return (a.healthScore) <
						(b.healthScore)
						? 1
						: -1;
				});
				setFilteredRecipes(high);}
		

			
			if (e.target.value === 'low') {
				const low = [...filteredRecipes].sort((a, b) => {
					return (a.healthScore) >
						(b.healthScore)
						? 1
						: -1;
				});
				setFilteredRecipes(low);
			}
		} else if (searchRecipes.length && search) {
			if (e.target.value === 'asc') {
				const asc = [...searchRecipes].sort((a, b) => {
					return a.title.toLowerCase() > b.title.toLowerCase()
						? 1
						: -1;
				});
				setRecipes(asc);
			}
			if (e.target.value === 'des') {
				const des = [...searchRecipes].sort((a, b) => {
					return a.title.toLowerCase() < b.title.toLowerCase()
						? 1
						: -1;
				});
				setRecipes(des);
			}
			if (e.target.value === 'high') {
				const high = [...searchRecipes].sort((a, b) => {
					return (a.healthScore) <
						(b.healthScore)
						? 1
						: -1;
				});
				setRecipes(high);
			}
			if (e.target.value === 'low') {
				const low = [...searchRecipes].sort((a, b) => {
					return (a.healthScore) >
						(b.healthScore)
						? 1
						: -1;
				});
				setRecipes(low);
			}
		} else {
			if (e.target.value === 'asc') {
				const asc = [...allRecipes].sort((a, b) => {
					return a.title.toLowerCase() > b.title.toLowerCase()
						? 1
						: -1;
				});
				setOrderedRecipes(asc);
			}
			if (e.target.value === 'des') {
				const des = [...allRecipes].sort((a, b) => {
					return a.title.toLowerCase() < b.title.toLowerCase()
						? 1
						: -1;
				});
				setOrderedRecipes(des);
			}
			if (e.target.value === 'high') {
				const high = [...allRecipes].sort((a, b) => {
					return (a.healthScore) <
						(b.healthScore)
						? 1
						: -1;
				});
				setOrderedRecipes(high);
			}
			if (e.target.value === 'low') {
				const low = [...allRecipes].sort((a, b) => {
					return (a.healthScore) >
						(b.healthScore)
						? 1
						: -1;
				});
				setOrderedRecipes(low);
			}
		}
	}
	
	// ------------- PAGINATED -------------------
	const numRecipes = 9;
	const maxPage = filteredRecipes.length
		? Math.ceil(filteredRecipes.length / numRecipes)
		: searchRecipes.length
		? Math.ceil(searchRecipes.length / numRecipes)
		: Math.ceil(allRecipes.length / numRecipes);

	const next = function () {
		if (page < maxPage) {
			setOffset(offset + numRecipes);
			setPage(page + 1);
		}
	};

	const previous = function () {
		if (page > 1) {
			setOffset(offset - numRecipes);
			setPage(page - 1);
		}
	};

	useEffect(() => {
		if (search) {
			if (searchRecipes) {
				let pageRecipes = [...searchRecipes].slice(
					offset,
					offset + numRecipes
				);
				setRecipes(pageRecipes);
			}
		} else {
			if (filteredRecipes.length) {
				let pageRecipes = [...filteredRecipes].slice(
					offset,
					offset + numRecipes
				);
				setRecipes(pageRecipes);
			} else if (orderedRecipes.length) {
				let pageRecipes = [...orderedRecipes].slice(
					offset,
					offset + numRecipes
				);
				setRecipes(pageRecipes);
			} else {
				let pageRecipes = [...allRecipes].slice(
					offset,
					offset + numRecipes
				);
				setRecipes(pageRecipes);
			}
		}
	}, [
		allRecipes,
		filteredRecipes,
		orderedRecipes,
		searchRecipes,
		page,
		offset,
		search,
	]);
	

	return (
		<React.Fragment>
			<div className='main'>
			<div>
				<div>
					<div className='filter-sort'>
						<div>
							<span>Sort: </span>
							<select onChange={handleSort}>
								<option  default value=''></option>
								<option value='asc'>A-Z</option>
								<option value='des'>Z-A</option>
							</select>

							<span>Order: </span>
							<select onChange={handleSort}>
								<option default value=''></option>
								<option value='high'>High</option>
								<option value='low'>Low</option>
							</select>
							
							<span>Filter By Diet: </span>
							<select
								className='filter-select'
								onChange={(e) => setFilter(e.target.value)}
							>
								<option default value=''>
									All
								</option>
								<option value='gluten free'>Gluten Free</option>
								<option value='dairy free'>Ketogenic</option>
								<option value='vegetarian'>Vegetarian</option>
								<option value='lacto ovo vegetarian'>
									Lacto-Vegetarian
								</option>
								<option value='lacto ovo vegetarian'>
									Ovo-Vegetarian
								</option>
								<option value='vegan'>Vegan</option>
								<option value='pescatarian'>Pescetarian</option>
								<option value='paleolithic'>Paleo</option>
								<option value='primal'>Primal</option>
								<option value='whole 30'>Whole30</option>;
							</select>

						</div>
						<div>
						<Search setSearch={setSearch} />
						</div>
					</div>
				</div>
			</div>
			<div className='recipes-home'>
				{loading ? (
					<div>
						<img
							className='loading'
							src={Loading}
							alt='Loading'
						/>
					</div>
				) : recipes.length>0 ? (
					[...recipes].map((recipe) => (
						<Card
							key={recipe.id}
							id={recipe.id}
							title={recipe.title}
							image={recipe.image}
							diet={recipe.diet || recipe.diets}
						/>
					))
				) : (
					<div>
					<img className='not-found' 
					src={notFound}
					alt='Not found'/>
					<h1 className='not-found-text'> </h1>
					<button className='btn-not-found' onClick={(ev) => {setSearch('');
					setFilteredRecipes(ev, 'empty')}}>Try again</button>
					</div>
				)}
			</div>
			<div className='pagination'>
				<button className='btn-page' onClick={previous}>
					PREVIOUS
				</button>
				<span className='num-page'>{page}</span>
				<button className='btn-page' onClick={next}>
					NEXT
				</button>
			</div>
			</div>
		</React.Fragment>
	);
}
