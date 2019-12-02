import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-mentor-skills',
  templateUrl: './mentor-skills.component.html',
  styleUrls: ['./mentor-skills.component.css']
})
export class MentorSkillsComponent implements OnInit {
  techs = [];
  selectedSkill;

  constructor(private app: AppService) { }

  ngOnInit() {
    this.app.getAllSkills().subscribe(
      res => {
        if (res) {
          if (res.error || res.message) {
            console.log(res);
          } else {
            this.techs = res;
          }
        }
      },
      error => {
        console.log('error:', error);
      }
    );
  }

}
