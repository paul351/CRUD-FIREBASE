import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import Firebase from 'firebase/app';
import Swal from 'sweetalert2'


const data = [{ text: "how are you?" }, { text: "hello" }, { text: "my name is alexa" }, { text: "who is he?" }, { text: "have a nice day" }, { text: "what did you say?" },
{ text: "what is your name?"}, { text: "Do you speak Spanish?"}];

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.less']
})

export class PruebaComponent implements OnInit {

  // view: CalendarView = CalendarView.Month;

  // viewDate: Date = new Date();

  // events$: Observable<CalendarEvent<{ film: Film }>[]>;

  // activeDayIsOpen: boolean = false;
  textToSpeach: string = "";
  diseibol: boolean = false;
  inp_answer: string = "";
  user: Firebase.User;
  constructor(private router: Router,
    private afAuth: AngularFireAuth,) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.user = user;
        if (user.emailVerified == false) {
          this.router.navigate(['/emailVerification']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
    this.reset();
  }

  reset() {
    this.diseibol = true;
    this.inp_answer = "";
    let value = (Math.floor(Math.random() * data.length));
    this.textToSpeach = data[value].text.toLowerCase();
    console.log(this.textToSpeach);

  }

  voice(): void {
    var msg = new SpeechSynthesisUtterance();
    msg.lang = 'en-US';
    msg.text = this.textToSpeach;
    speechSynthesis.speak(msg);
    this.diseibol = false;
  }

  answer(): void {
    let answer = this.inp_answer.toLowerCase();

    if (answer == this.textToSpeach) {
      Swal.fire("Good job!", "", "success");
    } else {
      Swal.fire("Oh no!", "", "error");
    }
  }

}
