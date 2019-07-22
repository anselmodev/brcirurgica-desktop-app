export const parseHash = (theHash: string) => {
    if(theHash) {
        const splitHash = theHash.split('#');
        splitHash.shift();
        return splitHash
    } 
};
