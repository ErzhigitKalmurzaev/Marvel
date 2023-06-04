import { useHttp } from "../hooks/http.hooks";

const useMarvelService = () => {

    const {request, loading, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d000759f90eed7e8307adf4f2eb9d725';
    const _baseOffset = 210;
    // d000759f90eed7e8307adf4f2eb9d725

    

    const getAllCharacters  = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    } 

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);         
        return _transformComics(res.data.results[0]);
        
    }
    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description !== "" ? (char.description.slice(0, 210) + "...") : "There is no description for this character.",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    const _transformComics = (char) => {
        return {
            name: char.title,
            description: char.description !== "" ? char.description : "There is no description for this character.",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            id: char.id,
            language: char.textObjects.language || 'en-us',
            price: char.prices[0].price !== 0 ? (`${char.prices[0].price}$`) : "NOT AVAILABLE",
            page: char.pageCount
        }
    }

    return {loading, 
            error,
            process, 
            setProcess,
            getAllCharacters, 
            getCharacter, 
            getAllComics, 
            getComic, 
            clearError, 
            getCharacterByName};
}
export default useMarvelService;      