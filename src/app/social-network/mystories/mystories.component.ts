import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StateService } from 'src/app/state-service/state.service';
import { Portfolio } from '../interfaces/portfolio';
import { Publication, SavePublication } from '../interfaces/publication';
import { Reaction, SaveReaction } from '../interfaces/reaction';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-mystories',
  templateUrl: './mystories.component.html',
  styleUrls: ['./mystories.component.scss']
})
export class MystoriesComponent implements OnInit {

  @ViewChild('storyForm') storyForm!: NgForm;

  loop!: any;

  user = Number(localStorage.getItem('user_id'));

  awesome = 'AWESOME';
  like = 'LIKE';
  dislike = 'DISLIKE';

  story!: string;

  portfolios!: Portfolio[];

  users!: User[];

  reactions!: Reaction[];

  /*publication: SavePublication = {
    text: '',
    author: '',
  }*/

  reaction: SaveReaction = {
    user: '',
    publication: '',
    name: ''
  }

  comment!: string;

  objects!: any[];

  react = false;

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService, private stateService: StateService) { }

  ngOnInit(): void {
    console.log(this.user)
    this.apiService.getPortfolios().subscribe((ps) => {
      this.portfolios = ps
      //console.log(this.publications)
      this.apiService.getUsers().subscribe({
        next: users => this.users = users,
        error: e => console.log(e),
        complete: () => {
          //console.log(this.users)
          this.apiService.getReactions(this.user).subscribe({
            next: rs => this.reactions = rs,
            error: e => console.log(e),
            //complete: () => console.log(this.reactions)
          })
        }
      })
    })

    try {
      this.apiService.getObjects(this.user).subscribe({
        next: o => {
          if(o.length > 0) {
            this.objects = o;
            //console.log(this.objects)
          }
        },
        error: e => console.log(e),
        complete: () => {
          //console.log(this.objects)
          this.loop = new Array(this.objects.length)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  sendReaction(reaction: string, i: number) {
    let id_element = document.getElementsByClassName('id');
    let publication_id = id_element[i].innerHTML;

    if (typeof localStorage.getItem('user_id') != null) {

      this.reaction.name = reaction;
      this.reaction.user = localStorage.getItem('user_id');
      this.reaction.publication = publication_id;

      let emojis = document.getElementsByClassName(reaction);
      this.apiService.saveReaction(this.reaction).subscribe({
        next: () => {
          //console.log(emojis)
          if (emojis[i]) {
            emojis[i].setAttribute('class', 'red');
            this.ngOnInit();
          }
        },
        error: e => console.log(e),
        complete: () => {
          //console.log('reaction saved')
        }       
      })
    }
  }

  deleteReaction(reaction: string, i: number) {
    let elements = document.getElementsByClassName(reaction);

    let id = this.objects[i].reactions[0].id;
    this.apiService.deleteReaction(id).subscribe({
      next: () => {
        //console.log("deleting...")
        elements[i].setAttribute('class', 'black');
        this.ngOnInit();
      },
      error: e => console.log(e),
      complete: () => {
        //console.log("complete")
      }
    })
  }

  routeToPortfolioGraphs(id: any) {
    //console.log(id)
    this.router.navigate([`/graphs/portfolio/${id}`]);
  }
}
