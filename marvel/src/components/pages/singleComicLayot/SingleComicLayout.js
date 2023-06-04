import { Link } from 'react-router-dom';
import './singleComicLayout.scss';

const SingleComicLayout = ({data}) => {

    const {name, description, thumbnail, price, page} = data;

    return (
        <div className='single-comic'>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{`${page} pages`}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic_back">Back to all</Link>
        </div>
    )
}

export default SingleComicLayout;