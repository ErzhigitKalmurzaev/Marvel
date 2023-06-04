import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {MainPage, ComicsPage, SinglePage} from '../pages';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../Spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const SingleComicPage = lazy(() => import('../pages/singleComicLayot/SingleComicLayout'));
const SingleCharPage = lazy(() => import('../pages/singleCharLayout/SingleCharLayout'));
// const MainPage = lazy(() => import('../pages/MainPage'));
// const ComicsPage = lazy(() => import('../pages/ComicsPage'));
// const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));


const  App = () => {
    return(
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fullback={<Spinner/>}>
                        <Routes>
                            <Route exact path='/' element={<MainPage/>}/>
                            <Route exact path='/comics' element={<ComicsPage/>}/>
                            <Route exact path='/comics/:id' element={<SinglePage Component={SingleComicPage} dataType='comic'/>}/>
                            <Route exact path='/characters/:id' element={<SinglePage Component={SingleCharPage} dataType='char'/>}/>
                            <Route exact path='*' element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;
