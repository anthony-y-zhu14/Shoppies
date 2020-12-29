import React from 'react'
import Header from '../component/Header'
import { Container } from '@material-ui/core';
import SearchPage from './SearchPage';
import NominationPage from './NominationPage';

export default function Main(){   
    const [searchPage, setSearchPage] = React.useState(true);    

    const render = {
        renderSearch : () => {if (!searchPage) setSearchPage(true)},
        renderNomination: () => {if (searchPage) setSearchPage(false)}
    }
    
    const page = searchPage? <SearchPage /> : <NominationPage />;

    return (
        <Container>    
            <Header render={render}/> 
            {page}             
        </Container>
    )
}