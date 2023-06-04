import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import ErrorMessege from '../errorMessege/ErrorMessege';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading': 
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessege/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const [comicList, setComicList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicEnded, setComicEnded] = useState(false);


    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onComicListLoaded = (newComicList) => {
        let ended = false;
        if(newComicList.length < 8){
            ended = true
        }

        setComicList(comicList => [...comicList, ...newComicList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setComicEnded(comicEnded => ended);
    }

    function renderItems(arr){
        const items = arr.map((item, i) => {
            return (
                <Link to={`/comics/${item.id}`}><li 
                    key={i} 
                    className="comics__item">
                    
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}</div>
                </li></Link>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicList), newItemLoading)}
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{'display' : comicEnded ? "none" : "block"}
            }>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;