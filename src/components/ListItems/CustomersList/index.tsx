import React from 'react';
import  { CustomerListContainer } from './styles';

type Props = {
    dataItems: object;
    currentPage: number;
    totalPages: number;
    totalResults: number;
};

export const BudgetList = (props: Props) => {
    return(
        <CustomerListContainer>
            Lista de Orçamentos
        </CustomerListContainer>
    );
};