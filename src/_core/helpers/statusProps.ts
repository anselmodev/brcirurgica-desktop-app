export const statusNames = (status: string | number) => {
    return status === 'canceled' || status === 1 ? 'Cancelado' : 
    status === 'closed' || status === 2 ? 'Fechado com Outro' : 
    status === 'await' || status === 3 ? 'Aguardando' : 
    status === 'success' || status === 4 ? 'Aprovado' : 
    status === 'draft' || status === 5 ? 'Rascunho' : 
    status === 'reapproved' || status === 6 ? 'Reprovado / Fechado com Outro Fornecedor' : 
    status === 'expired' || status === 7 ? 'Expirado' : 
    'Rascunho'
}

export const statusBackgroundColors = (status: string | number) => {
    return status === 'canceled' || status === 1 ? "#F39C11" : 
    status === 'closed' || status === 2 ? '#F25757' : 
    status === 'await' || status === 3 ? "#00A6CC" : 
    status === 'success' || status === 4 ? "#00A65A" : 
    status === 'draft' || status === 5 ? "#CCCACA" : 
    status === 'reapproved' || status === 6 ? 'red' : 
    status === 'expired' || status === 7 ? 'purple' : 
    "#CCCACA"
}
export const statusTextColors = (status: string | number) => {
    return status === 'canceled' || status === 1 ? "#f4f4f4" : 
    status === 'closed' || status === 2 ? '#f4f4f4' : 
    status === 'await' || status === 3 ? "#f4f4f4" : 
    status === 'success' || status === 4 ? "#f4f4f4" : 
    status === 'draft' || status === 5 ? "#575757" : 
    status === 'reapproved' || status === 6 ? '#f4f4f4' : 
    status === 'expired' || status === 7 ? '#f4f4f4' : 
    "#575757"
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
export const statusIcons = (status: string | number) => {
    return status === 'canceled' || status === 1 ? 'thumbs-o-down' : 
    status === 'closed' || status === 2 ? 'thumbs-o-down' : 
    status === 'await' || status === 3 ? 'clock-o' : 
    status === 'success' || status === 4 ? 'handshake-o' : 
    status === 'draft' || status === 5 ? 'file' : 
    status === 'reapproved' || status === 6 ? 'thumbs-o-down' : 
    status === 'expired' || status === 7 ? 'hourglass-3' : 
    'file'
}