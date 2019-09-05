import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


import Swal from 'sweetalert2';

import { UserService } from "../service/user.service";
import { ProjectsService } from '../service/projects.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
	user = this.userService.getUserName();

  Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		background: '#F5F5F5',
		showConfirmButton: false,
		timer: 3000
	});

  constructor(private router: Router, private userService: UserService,
     private projectService: ProjectsService) { }

  ngOnInit() {
  }

  logOut() {
    
    this.userService.logout().subscribe(
      res => {
        this.router.navigateByUrl('/login');    
        this.Toast.fire({
          type: 'success',
          title: 'Logged Out successfully'
        });
      },
      err => {
        console.log(err);
        this.projectService.errorFunction(err);
      }
    );
  }

}
