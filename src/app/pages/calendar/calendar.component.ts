import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { EventosService } from '../../services/eventos/eventos.service';
import { AngularFireAuth } from '@angular/fire/auth';
import  Firebase  from 'firebase/app';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {

  events : CalendarEvent[];

  modalRef: BsModalRef;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i-bs name="pencilFill"></i-bs>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"><a name="pencilFill"><a/></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  /*
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
  */
  activeDayIsOpen: boolean = true;
  constructor(private afAuth: AngularFireAuth,private modalService: BsModalService, private eventosService: EventosService) {
    this.afAuth.user.subscribe(user => {
      if(user){
        this.user = user;
      }
    });
  }

  user: Firebase.User

  ngOnInit(): void {
    this.getEvents()
  }

  async getEvents(){
    this.eventosService.getEventos().subscribe(res => {
        this.events = res.map((call: any) => {
          let objEvent = {
            start: new Date(call.payload.doc.data().start.seconds*1000),
            end: new Date(call.payload.doc.data().end.seconds*1000),
            title: call.payload.doc.data().title,
            color: call.payload.doc.data().color,
            resizable: {
              beforeStart: call.payload.doc.data().beforeStart,
              afterEnd: call.payload.doc.data().afterEnd,
            },
            draggable: call.payload.doc.data().draggable,
            id: call.payload.doc.id
          }
          return objEvent
        });
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    let obj = {
      start: newStart, end: newEnd
    }
    this.eventosService.updateEventos(obj,event?.id.toString()).then().catch(err=>console.error(err));
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    //this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalRef = this.modalService.show(this.modalContent, { class: "modal-lg" });
    //this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    let obj = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    }
    this.eventosService.createEventos(obj).then(() => {
    }).catch(err => {
      console.error(err);
    });
    this.events = [
      ...this.events,
      obj,
    ];
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  close() {
    this.modalRef.hide();
  }

  focusoutTitle(title:string,id:string) {
    let obj = { title: title}
    this.eventosService.updateEventos(obj,id).then(()=>{}).catch(err => {console.error(err)});
  }

  focusoutColorPrimary(color,id) {
    let obj = { color : {primary: color.primary, secondary: color.secondary}}
    this.eventosService.updateEventos(obj,id).then(()=>{}).catch(err => {console.error(err)});
  }

  focusoutColorSecondary(color,id) {
    let obj = { color : {primary: color.primary, secondary: color.secondary}}
    this.eventosService.updateEventos(obj,id).then(()=>{}).catch(err => {console.error(err)});
  }
  focusoutEventStart(start,id) {
    console.log("FECHA INICIO");
    console.log(start);
    let obj = {start:start}
    this.eventosService.updateEventos(obj,id).then(()=>{}).catch(err => {console.error(err)});
  }

  focusoutEventEnd(end,id) {
    console.log("FECHA FIN");
    let obj = {end:end}
    this.eventosService.updateEventos(obj,id).then(()=>{}).catch(err => {console.error(err)});
  }

  deleteEvent(eventToDelete: CalendarEvent,id) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.eventosService.deleteEventos(id).then(()=>{
      this.getEvents();
    });
  }

}
