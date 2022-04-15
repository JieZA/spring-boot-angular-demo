import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user-service.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-retrieve',
  templateUrl: './user-retrieve.component.html',
  styleUrls: ['./user-retrieve.component.css']
})
export class UserRetrieveComponent{

  id: number;
  user: User;
  show: boolean = false;

  constructor(
    private userService: UserService,
      private elementRef: ElementRef,
        private renderer: Renderer2,
          @Inject(DOCUMENT) private document: Document) {
    this.id =NaN;
    this.user = new User()
  }

  onSubmit() {
    this.userService.findOne(this.id).subscribe(
      data => this.displayUser(data),
      error => this.addAlert(error.error.message));
  }

  displayUser(data: User) {
    this.user = data;
    this.show = true;
    const div = this.document.getElementById("alert-box");
    if(this.document.getElementById("alert-box")) {
      this.renderer.removeChild(this.elementRef.nativeElement, div);
    }
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

