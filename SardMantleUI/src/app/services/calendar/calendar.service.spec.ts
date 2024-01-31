import { TestBed } from '@angular/core/testing';
import { CalendarService } from "./calendar.service";
import { CalendarDataService } from './calendar-data.service';
import { of } from 'rxjs';
import { Calendar } from 'src/app/models/units/calendar';
import { Injectable } from '@angular/core';

describe("CalendarService", () => {
  let service: CalendarService;
  let dataService: MockCalendarDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [{ provide: CalendarDataService, useClass: MockCalendarDataService }]
    });
    service = TestBed.inject(CalendarService);
    dataService = TestBed.inject(CalendarDataService) as MockCalendarDataService;
  });

  describe('toDateTimeObject', () => {
    it('should convert dateTime to dateTimeObject correctly', () => {
        let dateTime = 0n;
        let dto = service.toDateTimeObject(dateTime, mockCalendar);
        expect(dto.year).toEqual(0n);
        expect(dto.eraYear).toEqual(0n);
        expect(dto.month).toEqual(1);
        expect(dto.day).toEqual(1);
        expect(dto.weekday).toEqual(0);
        expect(dto.time[0]).toEqual(0);
        expect(dto.time[1]).toEqual(0);
        expect(dto.time[2]).toEqual(0);
        expect(dto.time[3]).toEqual(0);
    })
  })

  describe('fromDateTimeObject', () => {
    it ('should output the same value after passing through toDateTimeObject and fromDateTimeObject', () => {
        timesToTest.forEach(t => {
            let dto = service.toDateTimeObject(t, mockCalendar);
            let dt = service.fromDateTimeObject(dto, mockCalendar);
            expect(t).toEqual(dt);
        })
    })
  })

  describe('CalendarService', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});


@Injectable()
class MockCalendarDataService {
    public get(criteria: any) {
        return of(mockCalendar);
    }

    public put(data: any) {
        return of({});
    }

    public delete(id: number) {
        return of({});
    }
}

const timesToTest = [
    0n,
    100n,
    86400000n,
    5428354236n,
    265426542765247n,
    54893757890430594258674390756156n,
    4578398217589074197056479106571046574165714805670489165794813659481569403815613463416153672213n,
    1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
]

const mockCalendar: Calendar = {
    id: 9,
    name: "Charlottan Calendar",
    summary: "",
    unitTimePerDay: 86400000,
    months: [
      {
        name: "January",
        summary: "string",
        days: 31,
        sequence: 1
      },
      {
        name: "February",
        summary: "1",
        days: 28,
        sequence: 2
      },
      {
        name: "March",
        summary: "1",
        days: 31,
        sequence: 3
      },
      {
        name: "April",
        summary: "t",
        days: 30,
        sequence: 4
      }
    ],
    timeUnits: [
      {
        id: 0,
        amountPerDerived: 60,
        formatter: "h",
        name: "Hours",
        summary: ""
      },
      {
        id: 1,
        amountPerDerived: 60,
        formatter: "n",
        name: "Minutes",
        summary: ""
      },
      {
        id: 2,
        amountPerDerived: 1000,
        formatter: "s",
        name: "Seconds",
        summary: ""
      },
      {
        id: 3,
        amountPerDerived: 1,
        formatter: "l",
        name: "Milliseconds",
        summary: ""
      }
    ],
    eras: [
      {
        eraDefinitions: [
          {
            id: 0,
            name: "Year",
            summary: "",
            start: "0",
            end: "47347200000",
            backwards: false,
            eraNumber: 1
          },
          {
            id: 1,
            name: "Anyo",
            summary: "",
            start: "47347200000",
            end: "189388800000",
            backwards: false,
            eraNumber: 2
          },
          {
            id: 2,
            name: "The Sixth Year!!!!!!",
            summary: "",
            start: "236736000000",
            end: "284083200000",
            backwards: false,
            eraNumber: 3
          }
        ],
        defined: false,
        nameFormatter: "T",
        id: 1,
        amountPerDerived: 0,
        formatter: "t",
        name: "Stage",
        summary: ""
      },
      {
        eraDefinitions: [
          {
            id: 3,
            name: "Eon A",
            summary: "",
            start: "0",
            end: "23500800000",
            backwards: false,
            eraNumber: 1
          },
          {
            id: 4,
            name: "Eon B",
            summary: "",
            start: "23587200000",
            end: "47347200000",
            backwards: false,
            eraNumber: 2
          },
          {
            id: 5,
            name: "Eon C",
            summary: "",
            start: "47347200000",
            end: "142041600000",
            backwards: false,
            eraNumber: 1
          },
          {
            id: 6,
            name: "Eon D",
            summary: "",
            start: "142041600000",
            end: "158716800000",
            backwards: false,
            eraNumber: 2
          },
          {
            id: 7,
            name: "The Sixth Year!!!!!!",
            summary: "",
            start: "236736000000",
            end: "284083200000",
            backwards: false,
            eraNumber: 1
          }
        ],
        defined: false,
        nameFormatter: "O",
        id: 4,
        amountPerDerived: 0,
        formatter: "o",
        name: "Eon",
        summary: ""
      },
      {
        eraDefinitions: [
          {
            id: 8,
            name: "Epoch A",
            summary: "",
            start: "0",
            end: "10281600000",
            backwards: false,
            eraNumber: 1
          },
          {
            id: 9,
            name: "Epoch B",
            summary: "",
            start: "10368000000",
            end: "23500800000",
            backwards: false,
            eraNumber: 2
          },
          {
            id: 10,
            name: "Epoch C",
            summary: "",
            start: "23587200000",
            end: "47347200000",
            backwards: false,
            eraNumber: 1
          },
          {
            id: 11,
            name: "Epoch D",
            summary: "",
            start: "47347200000",
            end: "94694400000",
            backwards: false,
            eraNumber: 1
          },
          {
            id: 12,
            name: "The Sixth Year!!!!!!",
            summary: "",
            start: "236736000000",
            end: "284083200000",
            backwards: false,
            eraNumber: 1
          }
        ],
        defined: false,
        nameFormatter: "P",
        id: 3,
        amountPerDerived: 0,
        formatter: "p",
        name: "Epoch",
        summary: ""
      },
      {
        eraDefinitions: [
          {
            id: 13,
            name: "January",
            summary: "",
            start: "0",
            end: "2678400000",
            backwards: false,
            eraNumber: 1
          },
          {
            id: 14,
            name: "February",
            summary: "",
            start: "2678400000",
            end: "5097600000",
            backwards: false,
            eraNumber: 2
          },
          {
            id: 15,
            name: "March",
            summary: "",
            start: "5097600000",
            end: "7776000000",
            backwards: false,
            eraNumber: 3
          },
          {
            id: 16,
            name: "The Sixth Year!!!!!!",
            summary: "",
            start: "236736000000",
            end: "284083200000",
            backwards: false,
            eraNumber: 1
          }
        ],
        defined: false,
        nameFormatter: "A",
        id: 2,
        amountPerDerived: 0,
        formatter: "a",
        name: "Age",
        summary: ""
      },
      {
        eraDefinitions: [
          {
            id: 17,
            name: "Early",
            summary: "",
            start: "0",
            end: "259200000",
            backwards: false,
            eraNumber: 1
          },
          {
            id: 18,
            name: "Early Mid",
            summary: "",
            start: "259200000",
            end: "604800000",
            backwards: false,
            eraNumber: 2
          },
          {
            id: 19,
            name: "Quite mid",
            summary: "",
            start: "604800000",
            end: "1209600000",
            backwards: false,
            eraNumber: 3
          },
          {
            id: 20,
            name: "Mid Late",
            summary: "",
            start: "1209600000",
            end: "2419200000",
            backwards: false,
            eraNumber: 4
          },
          {
            id: 21,
            name: "Late",
            summary: "",
            start: "2419200000",
            end: "2678400000",
            backwards: false,
            eraNumber: 5
          },
          {
            id: 22,
            name: "Month of the 3rd year",
            summary: "",
            start: "142041600000",
            end: "144720000000",
            backwards: false,
            eraNumber: 0
          },
          {
            id: 23,
            name: "The Sixth Year!!!!!!",
            summary: "",
            start: "236736000000",
            end: "266371200000",
            backwards: false,
            eraNumber: 1
          },
          {
            id: 24,
            name: "The sixth year part 2",
            summary: "",
            start: "273715200000",
            end: "568166400000",
            backwards: false,
            eraNumber: 2
          }
        ],
        defined: false,
        nameFormatter: "E",
        id: 1,
        amountPerDerived: 0,
        formatter: "e",
        name: "Era",
        summary: ""
      }
    ],
    timeZones: [
      {
        id: 0,
        name: "string",
        summary: "string",
        offset: 1,
        derivedTimeUnitId: 1
      }
    ],
    formatters: [
      {
        id: 0,
        name: "Default Date",
        summary: "",
        formatter: "|t|o|p|a|e|-|yyyy|mm|dd|-|hh|nn|ss|lll|"
      },
      {
        id: 1,
        name: "Formatter 2",
        summary: "Secondary Formatter",
        formatter: "WWW$, MMM$. d, yyyy hh:nn:ss:lll"
      },
      {
        id: 2,
        name: "Default",
        summary: "Default Formatter",
        formatter: "yyyy/mm/dd hh:nn:ss:lll"
      },
      {
        id: 3,
        name: "The Month",
        summary: "",
        formatter: "MMMMMMMMMMMMMMMMMMMMMMMM"
      }
    ],
    weekdays: [
      {
        sequence: 0,
        name: "Monday",
        summary: "Mon",
        formatter: "M"
      },
      {
        sequence: 0,
        name: "Tuesday",
        summary: "Tue",
        formatter: "T"
      },
      {
        sequence: 0,
        name: "Wednesday",
        summary: "1",
        formatter: "W"
      },
      {
        sequence: 0,
        name: "Thursday",
        summary: "1",
        formatter: "Th"
      },
      {
        sequence: 0,
        name: "Friday",
        summary: "Fr",
        formatter: "F"
      },
      {
        sequence: 0,
        name: "Saturday",
        summary: "ah",
        formatter: "S"
      },
      {
        sequence: 0,
        name: "Sunday",
        summary: "ah",
        formatter: "Su"
      }
    ],
    selected: false
}