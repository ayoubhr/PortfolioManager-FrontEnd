import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';
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

  publications!: Publication[];

  users!: User[];

  reactions!: Reaction[];

  publication: SavePublication = {
    text: '',
    author: '',
  }

  reaction: SaveReaction = {
    user: '',
    publication: '',
    name: ''
  }

  comment!: string;

  objects!: any[];

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    /*this.apiService.getPublications().subscribe((ps) => {
      this.publications = ps
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
    })*/

    /*try {
      this.apiService.getObjects(this.user).subscribe({
        next: o => this.objects = o,
        error: e => console.log(e),
        complete: () => {
          console.log(this.objects)
          this.loop = new Array(this.objects.length)
        }
      })
    } catch (error) {
      console.log(error)
    }*/
  }

  submitStory() {
    if (typeof localStorage.getItem('user_id') != null) {
      this.publication.author = localStorage.getItem('user_id');
      this.publication.text = this.comment;
      /*this.apiService.savePublication(this.publication).subscribe({
        next: () => location.reload()
      })*/
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
          console.log(emojis)
          if (emojis[i]) {
            emojis[i].setAttribute('class', 'red');
            this.ngOnInit();
          }
        },
        error: e => console.log(e),
        complete: () => console.log('reaction saved')       
      })
    }
  }

  /*showReaction(reaction: string){
    let show = document.getElementById('show');
    let wrap = document.getElementById('show-wrap');

    wrap?.setAttribute('style', 'color: red; cursor: pointer; width: 21px;');

    if(reaction === 'AWESOME') {
      show?.setAttribute('class', 'red');
      show?.setAttribute('class', 'icon-active');
      show?.setAttribute('class', 'bi bi-emoji-sunglasses');
    } else if(reaction === 'LIKE') {
      show?.setAttribute('class', 'red');
      show?.setAttribute('class', 'icon-active');
      show?.setAttribute('class', 'bi bi-hand-thumbs-up');
    } else if(reaction === 'DISLIKE'){
      show?.setAttribute('class', 'red');
      show?.setAttribute('class', 'icon-active');
      show?.setAttribute('class', 'bi bi-hand-thumbs-down');
    }
  }*/

  deleteReaction(reaction: string, i: number) {
    let elements = document.getElementsByClassName(reaction);

    let id = this.objects[i].reactions[0].id;
    this.apiService.deleteReaction(id).subscribe({
      next: () => {
        console.log("deleting...")
        elements[i].setAttribute('class', 'black');
        this.ngOnInit();
      },
      error: e => console.log(e),
      complete: () => console.log("complete")
    })
  }

}
