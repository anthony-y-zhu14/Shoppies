import React from 'react'
import Header from '../component/Header'
import { Container } from '@material-ui/core';
import SearchPage from './SearchPage';

export default function Main(){   
    
    return (
        <Container>    
            <Header /> 
            <SearchPage />              
        </Container>
    )
}