import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  constructor(private usersService: UsersService) {}

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
        this.postStatus = res.status;
      },
      err => {
        return err;
      }
    );
  }
}
