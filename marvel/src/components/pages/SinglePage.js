import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComic, getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        if(!id){
            return;
        }

        // eslint-disable-next-line default-case
        switch(dataType) {
            case 'comic': 
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case 'char':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        }
    }


    const onDataLoaded = (data) => {
        setData(data);
    }

    let name = data ?data.name : 'Single Page';

    return (
        <>
            <Helmet>
                <meta name='description' content="Single character info"/>
                <title>{name}</title>
            </Helmet>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;