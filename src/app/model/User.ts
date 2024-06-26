export class User {
    constructor(public id: string, public email: string, public _token: string,
        public _tokenExppirationDate: Date
    ) { }
    get token() {
        //لو مفيش تاريخ انتهاء او تاريخ اليوم اكبر من تاريخ الانتهاء يعنى المده خلصت
        if (!this._tokenExppirationDate || new Date() > this._tokenExppirationDate) {
            return null;
        }
        else {
            return this._token;
        }

    }
}