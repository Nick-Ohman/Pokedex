import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList } from "../actions/pokemonActions";

import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const PokemonList = (props) => {
    const pokemonName = props.match.params.pokemon;
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);
    

    React.useEffect((page = 1 ) => {
        dispatch(GetPokemonList(page))
    }, [dispatch]);

   

    const showData = () => {
        if (pokemonList.loading) {
            return <p>Loading...</p>
        }
        
        if (!_.isEmpty(pokemonList.data)) {

            return (
                <div className="list-wrapper">
                    {pokemonList.data.map(list => {
                        
                        return (
                            <div className="pokemon-item">
                                
                                <p>{list.name}</p>
                                <Link className="view" to={`/pokemon/${list.name}`}>View</Link>
                            </div>
                        )
                    })}
                </div>
            )
        }

        if (pokemonList.errorMsg !== "") {
            return <p>{pokemonList.errorMsg}</p>
        }
        return <p>unable to get data</p>
    };
    return (
        <div>
            <div className="search-wrapper">
                <h2>Search</h2>
                <input className="search" type="text" onChange={e => setSearch(e.target.value)} />
                <button className="searchb" onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>

            </div>
            {showData()}
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                    pageCount={Math.ceil(pokemonList.count / 15)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => dispatch(GetPokemonList(data.selected + 1))}
                    containerClassName={"pagination"}
                />
            )}
        </div>
    )
};

export default PokemonList;