import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private subject = new Subject<any>();
    dateSource = new BehaviorSubject([]);
    isEnable: Boolean = false;
    org_id: any;

    roomListSubject = new BehaviorSubject([]);
    breadCrumbData = new BehaviorSubject([]);
    zoomSubject = new BehaviorSubject({});

    constructor(private http: HttpClient) {
    }
}
