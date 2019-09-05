import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  // uri = "http://192.168.10.190:8080/api/";
  uri = "http://192.168.10.187:8080/api/testLink/";
  sublink = ["testLink/", "dashboard/"];

  constructor(private http: HttpClient, private router: Router) {}

  getHeader() {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    return header;
  }
  getEventsList() {
    let headers = this.getHeader();
    return this.http.get(this.uri + this.sublink[0] + "getEventsList", {
      headers: headers
    });
  }
}
