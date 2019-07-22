import React from 'react';
import  { UsersListContainer } from './styles';

type Props = {
    dataItems: object;
    currentPage: number;
    totalPages: number;
    totalResults: number;
};

export const BudgetList = (props: Props) => {
    return(
        <UsersListContainer>
            Lista de Orçamentos
        </UsersListContainer>
    );
};