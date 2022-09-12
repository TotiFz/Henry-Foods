import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipesById } from '../../redux/actions/actions';
import loadingGif from '../../images/loading.gif';
import './Details.css';

function Details(){
    const params = useParams();
    const {id} = params;
    const [loading, setLoading] = useState(true);
    const data = useSelector((state) => state.details);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipesById(id))        
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }, [dispatch, id])
    console.log(data.title)
    return (
        <React.Fragment>
            <div className="details-main">
                {loading ? (
                    <div>
                        <img className='img-loading'src={loadingGif} alt='Loading...'/>
                    </div>
                ) : (data.title || data[0].title) ? (
                    <div>
                        <h1 className="details-title">{data.title || data[0].title }</h1>
                        <div className="container-details">
                            <div className="container-score">
                                <img className='img-score'src={data.image || data[0].image} alt='recipe'/>
                                <h2 className="details-score">{`${data.healthScore || data[0].healthScore}% Healthy`}</h2>
                            </div>
                            <div className="container-intructions">
                                <h2>{data.summary && 'Summary'}</h2>
								    <div className='details-summary'>
									    <p
										    dangerouslySetInnerHTML={{
										    	__html: data.summary || data[0].summary,
										    }}
									    />
								    </div>
								<h2>{data.analyzedInstructions && 'Instructions'}</h2>
								    <div className='details-instructions'>
									    <p
										    dangerouslySetInnerHTML={{
										    	__html: JSON.stringify(data.analyzedInstructions || data[0].analyzedInstructions)
                                            }}
									    />
                                    </div>
                                <h2>{data.diet && 'Diet'}</h2>
                                <h3 >{`${data.diet || data[0].diet }`}</h3>
                                <h2>{data.dishTypes && 'dishTypes'}</h2>
                                <h3 >{`${data.dishTypes}`}</h3>
								    
                                   
                            </div>
                        </div>
                    </div>
                ): (
                <h1>Oh no! Something didn't work</h1>
                )}
            </div>
        </React.Fragment>
    )

}
export default Details;