export const statusNames = (status: string) => {
    return status === 'canceled' ? 'Cancelado' : 
    status === 'closed' ? 'Fechado com Outro' : 
    status === 'await' ? 'Aguardando' : 
    status === 'success' ? 'Aprovado' : 
    status === 'draft' ? 'Rascunho' : 
    status === 'reapproved' ? 'Reprovado / Fechado com Outro Fornecedor' : 
    status === 'expired' ? 'Expirado' : 
    'Rascunho'
}

export const statusColors = (status: string) => {
    return status === 'canceled' ? "#F39C11" : 
    status === 'closed' ? '#F25757' : 
    status === 'await' ? "#00A6CC" : 
    status === 'success' ? "#00A65A" : 
    status === 'draft' ? "#CCCACA" : 
    status === 'reapproved' ? 'red' : 
    status === 'expired' ? 'purple' : 
    "#CCCACA"
}
export const statusNumber = (status: string) => {
    return status === 'canceled' ? 1 : 
    status === 'closed' ? 2 :
    status === 'await' ? 3 : 
    status === 'success' ? 4 : 
    status === 'draft' ? 5 : 
    status === 'reapproved' ? 6 : 
    status === 'expired' ? 7 : 
    "#CCCACA"
}