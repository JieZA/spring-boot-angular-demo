import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-service.service';
import { User } from '../user';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  user: User;

  constructor(
    private route: ActivatedRoute,
      private router: Router,
        private userService: UserService,
          private elementRef: ElementRef,
            private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document) {
    this.user = new User();
  }

  onSubmit() {
    this.userService.save(this.user).subscribe(
      result => this.gotoUserList(),
      error => this.addAlert(error.error.message));
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }

  addAlert(error: string) {
    if(!this.document.getElementById("alert-box")) {
      const div = this.document.createElement('div');
      div.className = "alert";
      div.id = "alert-box";
      div.style.padding = '10px';
      div.style.backgroundColor = '#f44336';
      div.style.color = "white";
      div.textContent = "x" + " " + error;
      this.renderer.appendChild(this.elementRef.nativeElement, div);
    }
  }
}
