import './charList.scss';
import { useState, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessege from '../errorMessege/ErrorMessege';

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

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {process, setProcess, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setCharEnded(charEnded => ended);
    }

    
    function renderItems(arr){
        const {charId} = props;
        const items = arr.map((item) => {
            let active = 'char__item_selected';
            let charItem = 'char__item';
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'contain'};
            }
            if(item.id === charId){
                charItem = `char__item ${active}` 
            }
            
            return (
                <CSSTransition timeout={500} classNames='char__item'>
                        <li 
                        className={charItem} 
                        key={item.id}
                        onClick={() => props.onCharSelected(item.id)}
                        >
                                <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                                <div className="char__name">{item.name}</div>
                        </li>
                </CSSTransition>
            )
        });

        return(
            <ul className="char__grid">
                <TransitionGroup component={null}>
                        {items}
                </TransitionGroup>
            </ul>
        )
    }

   
    

    return(
        <div className="char__list">
            {setContent(process, () => renderItems(charList), newItemLoading)}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display' : charEnded ? "none" : "block"}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;