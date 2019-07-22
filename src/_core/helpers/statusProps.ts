export const statusNames = (status: string) => {
    return status === 'canceled' ? 'Cancelado' : 
    status === 'closed' ? 'Fechado com Outro' : 
    status === 'await' ? 'Aguardando' : 
    status === 'success' ? 'Aprovado' : 
    status === 'draft' ? 'Rascunho' : 
    'Rascunho'
}

export const statusColors = (status: string) => {
    return status === 'canceled' ? "#F39C11" : 
    status === 'closed' ? '#F25757' : 
    status === 'await' ? "#00A6CC" : 
    status === 'success' ? "#00A65A" : 
    status === 'draft' ? "#CCCACA" : 
    "#CCCACA"
}
export const statusNumber = (status: string) => {
    return status === 'canceled' ? 1 : 
    status === 'closed' ? 2 :
    status === 'await' ? 3 : 
    status === 'success' ? 4 : 
    status === 'draft' ? 5 : 
    "#CCCACA"
}