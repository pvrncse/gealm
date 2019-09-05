import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  // uri = "http://192.168.10.190:8080/api/";
  uri = "http://192.168.10.187:8080/api/testLink/";
  sublink = ["testLink/", "dashboard/"];

  constructor(private router: Router, private userService: UserService) {}
  // Error function

  errorFunction(err) {
    if (err.status == 401) {
      Swal.fire({
        width: "400px",
        padding: "0px 0px 10px 0px",
        type: "error",
        text: "Your session is expired. Please login again.",
        showConfirmButton: false,
        timer: 2000
      });
      this.userService.deleteAccessToken();
      this.router.navigateByUrl("/login");
    } else if (err.status == 0) {
      Swal.fire({
        width: "450px",
        padding: "0px 10px 15px",
        type: "error",
        text:
          "GES-ALM is temporarily down. Sorry for the inconvenience. Please try after some time.",
        showConfirmButton: false,
        showCloseButton: true
      });
    } else if (err.error.message) {
      Swal.fire({
        width: "400px",
        text: err.error.message,
        type: "error",
        showConfirmButton: false,
        showCloseButton: true
      });
    } else {
      Swal.fire({
        width: "400px",
        text: "Something went wrong. Please try again later.",
        type: "error",
        showConfirmButton: false,
        showCloseButton: true
      });
    }
  }
}
