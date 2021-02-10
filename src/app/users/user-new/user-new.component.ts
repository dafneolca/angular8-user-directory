import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router, private toastr: ToastrService) {}

  newUserForm: FormGroup;
  postStatus: number;

  faUserPlus = faUserPlus;

  ngOnInit() {
    this.newUserForm = new FormGroup({
      'first-name': new FormControl(null, Validators.required),
      'last-name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'avatar': new FormControl(null),
      'id': new FormControl(null),
    });
  }

  onSubmit() {
    const newUser = this.newUserForm.value;
    this.usersService.addUser(newUser).subscribe(
      res => {
        this.toastr.success('User has been added', 'Success');
        setTimeout(() => {
          this.router.navigate(['users']);
        }, 1000);
        this.postStatus = res.status;
      },
      err => {
        this.toastr.error('This user could not be added', 'Error');
        return err;
      }
    );
  }
}
