import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IUser } from '../models/user.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userID: number;
  user: IUser;

  userForm: FormGroup;
  postStatus: number;

  faEdit = faEdit;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService, private modalService: BsModalService) {}

  ngOnInit() {
    this.userID = this.route.snapshot.params['id'];
    if (this.userID) {
      this.getData();
    }
  }

  getData() {
    this.usersService.getUser(this.userID).subscribe(
      res => {
        this.user = res['data'];
        this.userForm = new FormGroup({
          'first_name': new FormControl(this.user.first_name, Validators.required),
          'last_name': new FormControl(this.user.last_name, Validators.required),
          'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
          'avatar': new FormControl(this.user.avatar),
          'id': new FormControl(this.user.id),
        });

      },
      err => {
        console.log(err);
        return err;
      }
    );
  }

  onSubmit() {
    const updatedUser = this.userForm.value;
    this.usersService.updateUser(updatedUser).subscribe(
      res => {
        this.postStatus = res.status;
        console.log('post status: ', this.postStatus);
        setTimeout(() => {
          this.router.navigate(['users']);
        }, 1000);
      },
      err => {
        console.log(err);
        return err;
      }
    );
  }
  onCancel() {
    this.router.navigate(['users']);
  }
}
