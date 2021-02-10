import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IUser } from '../models/user.model';
import { faTrashAlt, faEnvelope, faPhone, faUserAlt } from '@fortawesome/free-solid-svg-icons';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userID: number;
  user: IUser;
  modalRef: BsModalRef;
  faTrashAlt = faTrashAlt;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faUserAlt = faUserAlt;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService,
    private modalService: BsModalService, private toastr: ToastrService) {}

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
      },
      err => {
        if (err.status === 404) {
          this.toastr.error('This user does not exist', 'Error');
          this.router.navigate(['not-found']);
        }
        return err;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteUser() {
    console.log('[deleting] ', this.user);
    this.modalRef.hide();
    this.usersService.deleteUser(this.userID).subscribe(
      res => {
        console.log(res);
        this.toastr.success('User has been deleted', 'Success');
        setTimeout(() => {
          this.router.navigate(['users']);
        }, 1000);
      },
      err => {
        this.toastr.error('This user could not be deleted', 'Error');
        return err;
      }
    );
  }
}
