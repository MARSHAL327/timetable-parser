const axios = require('axios');
const cheerio = require('cheerio');

class SevSU_TimeTable {
    constructor() {
        this.authorize()
    }

    async authorize(){
        let credentials = {
            username: "u22-00-019777",
            password: "7NmxsNPC",
            credentialId: ''
        }

        let headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
        }

        let timetable_auth_url = "https://timetable.sevsu.ru/auth/keycloak/redirect";

        let response = await axios.get(timetable_auth_url, { maxRedirects: 0, validateStatus: false });
        let auth_page_url = response.headers.location;

        response = await axios.get(auth_page_url);
        let auth_cookie = response.headers['set-cookie'].join('; ');

        const authPage = cheerio.load(response.data);
        let auth_url = authPage('form').attr('action');


        let options = {
            method: "get",
            headers: {
                // ...headers,
                'User-Agent': 'PostmanRuntime/7.32.3',
                'Accept': "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                'Cookie': "AUTH_SESSION_ID=59083e88-8b4e-4669-b6c9-da0a7e9f6a83.b0bd35ac2614; AUTH_SESSION_ID_LEGACY=59083e88-8b4e-4669-b6c9-da0a7e9f6a83.b0bd35ac2614; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4NTMxODhmYS1kOTczLTQyNjAtOTQ4NC00OTAzNDMzMTc1ZDkifQ.eyJleHAiOjE2OTQ1ODYzOTgsImlhdCI6MTY5NDU1MDM5OCwianRpIjoiNzdhNzhmMzUtZWQyZS00YTZlLTg4NzktYzhhYWJiODFjNGM1IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNldnN1LnJ1L3JlYWxtcy9wb3J0YWwiLCJzdWIiOiIwYzBiYjcxOS1mNzg2LTQ1ODQtOTE0Yy02NzQwNjk3NTgwNDQiLCJ0eXAiOiJTZXJpYWxpemVkLUlEIiwic2Vzc2lvbl9zdGF0ZSI6IjU5MDgzZTg4LThiNGUtNDY2OS1iNmM5LWRhMGE3ZTlmNmE4MyIsInN0YXRlX2NoZWNrZXIiOiIwZnlxRTEzOGhHZVhlVTV5NXgzNXhuaDFZZUc4bEFCc1dla1JxZ3dDbzNnIn0.j1dLJI4xwrwf2PQYUAVkIbbur_uz1Pm-AkHfZdq6wz0; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4NTMxODhmYS1kOTczLTQyNjAtOTQ4NC00OTAzNDMzMTc1ZDkifQ.eyJleHAiOjE2OTQ1ODYzOTgsImlhdCI6MTY5NDU1MDM5OCwianRpIjoiNzdhNzhmMzUtZWQyZS00YTZlLTg4NzktYzhhYWJiODFjNGM1IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNldnN1LnJ1L3JlYWxtcy9wb3J0YWwiLCJzdWIiOiIwYzBiYjcxOS1mNzg2LTQ1ODQtOTE0Yy02NzQwNjk3NTgwNDQiLCJ0eXAiOiJTZXJpYWxpemVkLUlEIiwic2Vzc2lvbl9zdGF0ZSI6IjU5MDgzZTg4LThiNGUtNDY2OS1iNmM5LWRhMGE3ZTlmNmE4MyIsInN0YXRlX2NoZWNrZXIiOiIwZnlxRTEzOGhHZVhlVTV5NXgzNXhuaDFZZUc4bEFCc1dla1JxZ3dDbzNnIn0.j1dLJI4xwrwf2PQYUAVkIbbur_uz1Pm-AkHfZdq6wz0; KEYCLOAK_SESSION=portal/0c0bb719-f786-4584-914c-674069758044/59083e88-8b4e-4669-b6c9-da0a7e9f6a83; KEYCLOAK_SESSION_LEGACY=portal/0c0bb719-f786-4584-914c-674069758044/59083e88-8b4e-4669-b6c9-da0a7e9f6a83",
            },
            // data: credentials,
            // maxRedirects: 0,
            // validateStatus: false,
            url: "https://auth.sevsu.ru/realms/portal/protocol/openid-connect/auth?client_id=timetable&redirect_uri=https%3A%2F%2Ftimetable.sevsu.ru%2Fauth%2Fkeycloak%2Fcallback&scope=openid&response_type=code&state=IXJuNGY80vbEvz0etDeM3TwzOg87gxgW9dxqNgEG"
        };
        // console.log(auth_url)
        response = await axios(options);
        console.log(response.data)
        // console.log(auth_cookie)
        // console.log(response.headers['set-cookie'])
        // console.log(response.data)
        // console.log(auth_url)

        // let timetable_auth_page_url = response.headers.location;
        //
        // options = {
        //     headers: headers,
        //     maxRedirects: 0,
        //     validateStatus: false,
        // }
        //
        // response = await axios.get(timetable_auth_page_url, options);
        //
        // this.cookie = response.headers['set-cookie'].join('; ');
        // let timetable_url = response.headers.location;
        //
        // options = {
        //     method: "get",
        //     headers: {
        //         ...headers,
        //         "Cookie": this.cookie,
        //     },
        //     maxRedirects: 0,
        //     validateStatus: false,
        // }
        //
        // response = await axios.get(timetable_url, options);
        // const ttPage = cheerio.load(response.data);
        // this.data = JSON.parse(ttPage('div.main').attr('wire:initial-data'));
        // this.serverMemo = this.data.serverMemo;
        // this.csrf = ttPage('meta[name="csrf-token"]').attr('content');
    }

    async load_week(week_num) {
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
            data: JSON.stringify({
                ...this.data,
                updates: [{
                    "type": "fireEvent",
                    "payload": {
                        "id": (Math.random() + 1).toString(36).substring(8),
                        "event": "selectWeek",
                        "params": [
                            "2023-W" + ('00' + week_num).slice(-2)
                        ]
                    }
                }]
            }),
            maxRedirects: 0,
            validateStatus: false,
        }
        let response = await axios.post(admiss_url, null, options);
        this.serverMemo = JSON.parse(response.data).serverMemo;
        return this.currently_seeking_week_data();
    }

    get_current_week() {
        return parseInt(this.serverMemo.data.numbr_week);
    }

    currently_seeking_week_data() {
        return this.serverMemo.data.usr_tt;
    }
}


class CalendarManager {
    constructor(calendarName = "SevSU") {
        let calendars = CalendarApp.getCalendarsByName(calendarName);
        if(calendars.length === 0) {
            this.calendar = CalendarApp.createCalendar(calendarName);
        } else {
            this.calendar = calendars[0];
            // this.clearEvents();
        }
        this.time_list = {
            1: ["8:30", "10:00"],
            2: ["10:10", "11:40"],
            3: ["11:50", "13:20"],
            4: ["14:00", "15:30"],
            5: ["15:40", "17:10"],
            6: ["17:20", "18:50"],
            7: ["19:00", "20:30"],
            8: ["20:40", "22:10"]
        }
        this.nagruzka_list = {
            "Практические": "ПЗ",
            "Лабораторные": "ЛЗ",
            "Лекции": "Л"
        }
    }

    clearEvents(start_time = new Date()){
        let end_time = new Date(3000, 1, 1);

        let events = this.calendar.getEvents(start_time, end_time);
        let total_events = events.length,

        events_part = Math.round(total_events / 20);
        Logger.log(`Total events to remove: ${events.length}`);
        events.forEach((event, id) => {
            if((events_part) % id === 0 ) {
                Logger.log(`Current event: ${id}`);
            }
            event.deleteEvent();
        });
        Logger.log('Removed everething.');
    }

    extractTime(timeStr, dateStr){
        let sepIdx = timeStr.indexOf(":");

        let hoursStr = timeStr.substring(0, sepIdx);
        let minsStr = timeStr.substring(sepIdx + 1);

        sepIdx = dateStr.indexOf(".");

        let dayStr = dateStr.substring(0, sepIdx);
        let monthStr = dateStr.substring(sepIdx + 1, sepIdx + 3);

        sepIdx = dateStr.indexOf(".", sepIdx + 1);

        let yearStr = dateStr.substring(sepIdx + 1);

        let t = new Date();
        t.setHours(parseInt(hoursStr), parseInt(minsStr));
        t.setYear(parseInt(yearStr));
        t.setMonth(parseInt(monthStr) - 1, parseInt(dayStr));

        return t;
    }

    addToCalendarLesson(lessonData){
        if(lessonData.length > 0){
            let lesson = lessonData[0]

            let title = `${this.nagruzka_list[lesson.nagruzka]}(${lesson.auditory}): ${lesson.discipline_name}, ${lesson.teacher_name}`
            let start_time = this.extractTime(this.time_list[parseInt(lessonData[0].time)][0], lessonData[0].date)
            let end_time = this.extractTime(this.time_list[parseInt(lessonData[0].time)][1], lessonData[0].date)

            let event = this.calendar.createEvent(title, start_time, end_time)

            Utilities.sleep(50);
        }
    }

    addToCalendarDay(dayData){
        for (let i = 1; i<=8; i++){
            this.addToCalendarLesson(dayData[i])
        }
    }

    addToCalendarWeek(data) {
        this.addToCalendarDay(data.Понедельник)
        this.addToCalendarDay(data.Вторник)
        this.addToCalendarDay(data.Среда)
        this.addToCalendarDay(data.Четверг)
        this.addToCalendarDay(data.Пятница)
        this.addToCalendarDay(data.Суббота)
    }
}

let properties = {
    current_parsing_week_prop: "current_parsing_week",
    currently_run_prop: "currently_run",

    get current_parsing_week(){
        return parseInt(ScriptProperties.getProperty(this.current_parsing_week_prop));
    },
    set current_parsing_week(week){
        ScriptProperties.setProperty(this.current_parsing_week_prop, `${week}`);
    },

    get currently_run(){
        return ScriptProperties.getProperty(this.currently_run_prop) === 'true';
    },
    set currently_run(run){
        ScriptProperties.setProperty(this.currently_run_prop, run.toString());
    }
}

function get_monday(){
    let monday = new Date()
    while(monday.getDay() !== 1){
        monday.setDate(monday.getDate() - 1);
    }
    return monday;
}

function main() {
    let start_time = (new Date()).getTime();

    let timeTable = new SevSU_TimeTable();
    console.log(timeTable)
    // let calendar = new CalendarManager("Расписание ПИ/м-22-1-о");
    //
    // let start_week = timeTable.get_current_week() + 1,
    //     end_week = 24;
    //
    // let current_parsing_week = properties.current_parsing_week;
    // if (current_parsing_week !== 0) {
    //     Logger.log(`Start at the ${current_parsing_week} week.`);
    //     start_week = current_parsing_week;
    //     ScriptApp.newTrigger("main").timeBased().at(new Date(start_time + 400000)).create();
    //
    //     let day_counter = new Date((new Date()).getFullYear(), 0, 1);
    //     while(day_counter.getDay() !== 1){
    //         day_counter.setDate(day_counter.getDate() + 1);
    //     }
    //
    //     day_counter.setDate(day_counter.getDate() + 7 * (start_week-1));
    //
    //     calendar.clearEvents(day_counter);
    //
    // } else {
    //     if(properties.currently_run){
    //         properties.currently_run = false;
    //         return; // Work done.
    //     } else {
    //         ScriptApp.newTrigger("main").timeBased().at(new Date(start_time + 400000)).create();
    //
    //         calendar.clearEvents(get_monday());
    //         if((new Date(start_time + 360000)) - (new Date()).getTime() < 5000){
    //             return; // Just in case;
    //         }
    //         properties.currently_run = true;
    //     }
    // }
    //
    // weeks_to_parse = Array(end_week-start_week+1).fill().map((element, index) => index + start_week);
    //
    // // timeTable.load_week(weeks_to_parse[0]-1);
    // if(properties.current_parsing_week === 0){
    //     properties.current_parsing_week = start_week - 1;
    //     Logger.log(`Current week: ${start_week - 1}`);
    //     calendar.addToCalendarWeek(timeTable.currently_seeking_week_data())
    // }
    // weeks_to_parse.forEach(week => {
    //     properties.current_parsing_week = week;
    //     Logger.log(`Current week: ${week}`);
    //     weekData = timeTable.load_week(week);
    //     calendar.addToCalendarWeek(weekData);
    //     Utilities.sleep(50);
    // });
    // properties.current_parsing_week = 0;
}

main()