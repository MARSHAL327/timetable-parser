class SevSU_TimeTable {
    constructor() {
        let credentials = {
            username: ScriptProperties.getProperty('username'),
            password: ScriptProperties.getProperty('password'),
            credentialId: ''
        }

        let headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
        }

        let timetable_auth_url = "https://timetable.sevsu.ru/auth/keycloak/redirect";
        let response = UrlFetchApp.fetch(timetable_auth_url, {followRedirects: false});
        let auth_page_url = response.getAllHeaders()['Location'];

        response = UrlFetchApp.fetch(auth_page_url);
        let auth_cookie = response.getAllHeaders()['Set-Cookie'].join('; ');

        const authPage = Cheerio.load(response.getContentText());
        let auth_url = authPage('form').attr('action');

        let options = {
            method: 'post',
            headers: {
                'Cookie': auth_cookie,
            },
            payload: credentials,
            followRedirects: false,
        };
        response = UrlFetchApp.fetch(auth_url, options);
        let timetable_auth_page_url = response.getAllHeaders()['Location'];

        options = {
            method: "get",
            headers: headers,
            followRedirects: false,
        }

        response = UrlFetchApp.fetch(timetable_auth_page_url, options);

        this.cookie = response.getAllHeaders()['Set-Cookie'].join('; ');
        let timetable_url = response.getAllHeaders()['Location'];

        options = {
            method: "get",
            headers: {
                ...headers,
                "Cookie": this.cookie,
            },
            followRedirects: false,
        }

        response = UrlFetchApp.fetch(timetable_url, options);
        const ttPage = Cheerio.load(response.getContentText());
        this.data = JSON.parse(ttPage('div.main').attr('wire:initial-data'));
        this.serverMemo = this.data.serverMemo;
        this.csrf = ttPage('meta[name="csrf-token"]').attr('content');
    }

    load_week(week_num){
        let admiss_url = "https://timetable.sevsu.ru/livewire/message/student-rasp"
        let options = {
            method: "post",
            headers: {
                'Cookie': this.cookie,
                'X-CSRF-TOKEN': this.csrf,
                'X-Livewire': true,
                'Accept': 'text/html, application/xhtml+xml',
                'Content-Type': 'application/json',
                'Referer': 'https://timetable.sevsu.ru/timetablestudent#close',
            },
            payload: JSON.stringify({
                ...this.data,
                updates: [{
                    "type": "fireEvent",
                    "payload": {
                        "id": (Math.random() + 1).toString(36).substring(8),
                        "event": "selectWeek",
                        "params": [
                            "2023-W" + ('00'+week_num).slice(-2)
                        ]
                    }
                }]
            }),
        }
        let response = UrlFetchApp.fetch(admiss_url, options);
        this.serverMemo = JSON.parse(response).serverMemo;
        return this.currently_seeking_week_data();
    }

    get_current_week(){
        return parseInt(this.serverMemo.data.numbr_week);
    }

    currently_seeking_week_data() {
        return this.serverMemo.data.usr_tt;
    }
}