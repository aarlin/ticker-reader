import { lookup, history } from 'yahoo-stocks';

module.exports = async (ticker) => {
    const options = {
        interval: '1m',
        range: '5d'
    };

    history(ticker).then(response => {
        console.log(response);
    });

}
