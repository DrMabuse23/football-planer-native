import React, {
  Component
} from 'react-native';

export default class EventRecord extends Component{
  constructor(db) {
    super();
    this.dbConnection = db;
    this.ref = this.dbConnection.db.child("events");
  }

  getShema() {
    return {

    }
  }
  getEvents() {
    // let self = this;
    // this.placeService.getPlaces();
    // if (!this.inProgress) {
    //   self.events = [];
    //   this.inProgress = true;
    //   this.ref.orderByChild('playDate').once('value', (snapshot) => {
    //     //debugger;
    //     if (typeof snapshot === 'object') {
    //       let i = 0;
    //       snapshot.forEach((data) => {
    //         let model = {
    //           data: data.val(),
    //           id: data.key()
    //         };
    //         if (self.isPlayed(model.data.playDate)) {
    //           self.events.push(model);
    //           i++;
    //         } else {
    //           self.updateEvent(model.id, { 'played': true });
    //         }
    //       });
    //       self.childChanged();
    //       self.prepareEvents();
    //       self.inProgress = false;
    //     }
    //   }, (err) => console.error(err));
    // }
  }

}