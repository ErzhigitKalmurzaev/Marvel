import {useState} from "react";
import {Helmet} from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../cahrList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchForm from "../searchForm/SearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage = () => {

    const [selectedChar, setChar] = useState(null); 

    const onCharSelected = (id) => {
        setChar(id)
    }

    return(
        <>
            <Helmet>
                <meta name='description' content="Marvel information portal"/>
                <title>Marvel information portal</title>
            </Helmet>
            <RandomChar/>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected} charId={selectedChar}/>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SearchForm/>
                    </ErrorBoundary>
                </div>
            </div>
        </>
    )
}

export default MainPage;