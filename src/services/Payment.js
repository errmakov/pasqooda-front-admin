import axios from "axios";

export default class Payment {
    constructor(data) {
        this._apiUrl  = data.apiUrl;
        this._payDetails = data.payDetails
    }

    get() {
        return new Promise((resolve, reject) => {
            axios.post(this._apiUrl + '/checkout/newpayment', this._payDetails)
            .then((response)=>{
                console.log(response.data);
                if (response.data.id) {
                    resolve(response.data);
                    console.log('Payment id: ', response.data.id);
                } else {
                    console.log('Payment id is empty');
                    throw(new Error('Payment id is empty'));
                }
            })
            .catch((err)=>{
                console.error('Payment.get(): ', err.message);
                reject(err);
            })
        })
    }
}

