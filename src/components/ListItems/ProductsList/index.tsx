import React from 'react';
import  { ProductsListContainer } from './styles';

type Props = {
    dataItems: object;
    currentPage: number;
    totalPages: number;
    totalResults: number;
};

export const BudgetList = (props: Props) => {
    return(
        <ProductsListContainer>
            Lista de Orçamentos
        </ProductsListContainer>
    );
};