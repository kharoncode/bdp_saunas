import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  liset : number[] = []
  ngOnInit(): void {
    console.log('Init')
    console.log('before',this.liset)
    this.liset = [1,2,3,4,5]
    console.log('after',this.liset)
  }

}
