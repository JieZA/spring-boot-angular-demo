import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { UserService } from '../user-service.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent{

  id: number;

  constructor(
    private userService: UserService,
      private elementRef: ElementRef,
        private renderer: Renderer2,
          private router: Router,
            @Inject(DOCUMENT) private document: Document) {
    this.id =NaN;
  }

  onSubmit() {
    this.userService.deleteOne(this.id).subscribe(
      data => this.gotoUserList(),
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


