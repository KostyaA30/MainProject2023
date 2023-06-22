let base = new Map();
let DB, sizeOfUsers = 0;

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

// 		base.set(log, [pass, lat, latp, long, longp]);
//     }
// });

function addUser(login, pass) {
    if (!base.has(login)) {
        base.set(login, [pass, undefined, undefined, undefined, undefined]);
        sizeOfUsers++;
        return 1;
    } else {
        console.log('User with this login already exists.');
        return 0;
    }
}

function addPos(login, lat, long, latp, longp) {
    if (base.has(login)) {
        let obj = base.get(login);
        base.set(login, [obj[0], lat, long, latp, longp]);
    } else {
        console.log('ERROR!! NOT LOGIN!! NOT EXIST THIS USER!!');
    }
}

function signIn(login, pass) {
    if (base.has(login)) {
        let obj = base.get(login);
        if (obj[0] === pass) {
            console.log('login');
            return 1;
        } else {
            console.log('Wrong password.');
            return 0;
        }
    } else {
        console.log('Wrong login.');
        return 0;
    }
}
let XMLHttpRequest = require('xhr2');
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let sock = require('socket.io');
let path = require('path');
let fs = require('fs');

let io = sock(server);

const host = "192.168.30.91";
const port = 3000;
server.listen(port, host, () => {
	console.log(`Listen to http://${host}:${port}`);
});

app.use(express.static(path.join(__dirname, '')));
app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/index.html');
});

connections = [];

let textDB;

io.on('connection', function(socket) {
	console.log("Успешное соединение");
	connections.push(socket);
	fs.readFile('DB', 'utf8', (err, data) => {
		if (err) {
			throw err;
		}
		console.log(data);
		let mas = JSON.parse(data);
		let count = base[0];
		for (let i = 0; i < count; i += 6) {
			let log = base[i + 1],
				pass = base[i + 2],
				lat = base[i + 2],
				latp = base[i + 2],
				long = base[i + 2],
				longp = base[i + 2];

			data.set(log, [pass, lat, latp, long, longp]);
		}
	});

	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключились");
		textDB = `${base.size}`;
		if (base.size != 0) {
			for (let [key, [a, b, c, d, e]] of base) {
				if (entry === undefined) {
					break;
				}
				textDB += `\n${a} ${b} ${c} ${d} ${e}`;
			}
		}
		fs.writeFile("DB.txt", textDB, function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		}); 
	});
	
	socket.on('send user', function(data) {
		data.flg = addUser(data.nlogin, data.npass);
		io.sockets.emit('add user', {flg: data.flg});
	});
	socket.on('send login', function(data) {
		data.flg = signIn(data.login, data.pass);
		io.sockets.emit('add login', {flg: data.flg});
	});
	socket.on('send pos', function(data) {
		data.flg = addPos(data.login, data.lat, data.long, data.latp, data.longp);
		io.sockets.emit('add pos', {flg: data.flg});
	});
});