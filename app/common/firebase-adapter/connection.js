import Firebase from 'firebase';
let cfg = require('./config.json');

export default class DBService {
  constructor() {
    this.cfg = cfg;
    //this.dbAuthChange = new EventEmitter();
    this.db = new Firebase(this.cfg.api);
    this.loggedInUser = null;
  }

  onAuthCallback(authData) {
    if (authData) {
      console.log("Authenticated with uid:", authData);
    } else {
      console.log("Client unauthenticated.")
    }
  }

  auth() {
    if (!this.cfg) {
      return new Promise((resolve, reject) => {
        return reject('No Config', this.cfg);
      });
    }
    let self = this;
    return new Promise((resolve, reject) => {
      return this.db.authWithCustomToken(this.cfg.token, function (err, data) {
        if (err) {
          console.error(err);
          return reject(err);
        }
        self.dbAuth = true;
        return resolve(data);
      });
    });
  }

  getDb(){
    return this.db;
  }

  unauth() {
    return this.db.unauth();
  }
  authWithPassword(email, password) {
    console.log('(email, password', email, password);
    let self = this;
    //CryptoJS.HmacSHA256(password, this.cfg.token).toString()
    return new Promise((resolve, reject) => {

      return this.db.authWithPassword({
        "email": email,
        "password": password
      }, function(error, authData) {
        self.db.onAuth(self.onAuthCallback);
        self.db.offAuth(self.onAuthCallback);
        if (error) {
          console.error(error);
          return reject(error);
        } else {
          self.loggedInUser = authData;
          return resolve(authData);
        }
      });
    });
  }

}