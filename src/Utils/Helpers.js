export default class Helpers {
    constructor(props) {

    }

    static chartSettings() {
        var nba = {keyWidth: 16, keyMarks: [7, 8, 11, 14], threePointCutoffLength: 13.9,
                            threePointRadius: 23.75, threePointSideRadius: 22,
                            left3Inside: {x: (-120.94543 + 250) / 10,
                                                    y: 251.89778 / 10},
                            right3Inside: {x: (-120.94543 + 250) / 10,
                                                    y: 251.89778 / 10}};

        var coll = {keyWidth: 12, keyMarks: [11, 14, 17], threePointCutoffLength: 9.865,
                            threePointRadius: 22.146, threePointSideRadius: 21.55};

        return {nba: nba, coll: coll};
    }

    static fetchMethod(url, method, data) {
        let base = 'https://api.thehornetsnest.io';
        // add credentials here for authentication
        return fetch(base + url, {
            method: method,
            body: data,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
                'X-CSRFToken': this.getCsrftoken()
            }
        })
    }

    static getFetch(url) {
        return this.fetchMethod(url, "GET", null);
    }

    static postFetch(url, data) {
        return this.fetchMethod(url, "POST", data);
    }


}