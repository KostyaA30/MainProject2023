// class user {
//     user(login, pass) {
//         this.login = login;
//         this.pass = pass;
//         this.latitude = undefined;
//         this.longitude = undefined;
//         this.hemilat = undefined;
//         this.hemilong = undefined;
//     }

//     add(lat, long, latp, longp) {
//         this.latitude = lat;
//         this.longitude = long;
//         this.hemilat = latp;
//         this.hemilong = longp;
//     }
// }

// function readDB() {
//     fs.readFile('DB', 'utf8', (err, data) => {
//         if (err) {
//             throw err;
//         }
//         console.log(data);
//         DB = data;
//         DB.join(' ');
//         let count = DB[0];
//         for (let i = 0; i < count; i += 6) {
//             let log = DB[i + 1],
//                 pass = DB[i + 2],
//                 lat = DB[i + 2],
//                 latp = DB[i + 2],
//                 long = DB[i + 2],
//                 longp = DB[i + 2];

//             data.set(log, [pass, lat, latp, long, longp]);
//         }
//     });
// }


// let base = new Map();
// let DB, sizeOfUsers = 0;

// const ft1 = fetch("/DB.txt")
//     .then((res) => res.text())
//     .then((data) => {
//         DB = data;
// });

// const allData = Promise.all([ft1]);
// allData.then((res) => {
//     let mas = JSON.parse(DB);
//     if (mas === 0) {
//         return;
//     }
//     let count = mas[0];
//     for (let i = 0; i < count; i += 6) {
//         let log   = mas[i + 1],
//             pass  = mas[i + 2],
//             lat   = mas[i + 2],
//             latp  = mas[i + 2],
//             long  = mas[i + 2],
//             longp = mas[i + 2];

//         data.set(log, [pass, lat, latp, long, longp]);
//     }
// });

// function addUser(login, pass) {
//     if (!base.has(login)) {
//         base.set(login, [pass, undefined, undefined, undefined, undefined]);
//         sizeOfUsers++;
//         return 1;
//     } else {
//         console.log('User with this login already exists.');
//         return 0;
//     }
// }

// function addPos(login, lat, long, latp, longp) {
//     if (base.has(login)) {
//         let obj = base.get(login);
//         base.set(login, [obj[0], lat, long, latp, longp]);
//     } else {
//         console.log('ERROR!! NOT LOGIN!! NOT EXIST THIS USER!!');
//     }
// }

// function signIn(login, pass) {
//     if (base.has(login)) {
//         let obj = base.get(login);
//         if (obj[0] === pass) {
//             console.log('login');
//             return 1;
//         } else {
//             console.log('Wrong password.');
//             return 0;
//         }
//     } else {
//         console.log('Wrong login.');
//         return 0;
//     }
// }       