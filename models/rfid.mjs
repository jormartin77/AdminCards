import rfid from'node-rfid';

export default class Rfid{
    static readRfid() {
        rfid.readintime(5000, function (err, result) {
            if (err) console.log("Sorry, some hardware error occurred"); //some kind of hardware/wire error
            if (result == "timeout") {
                console.log(result);
                console.log("Sorry, You timed out");  //check if time exceeded the time you passed as argument and print timeout message
            } else {
                console.log(result); //print rfid tag UID
            }
            return result;
        });
    }
}
