import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  mentor = { firstName: null, lastName: null, timezone: null, skills: [], yearsOfExperience: null,
    introduction: null, linedinUrl: null, facilities: null, examples: null, userName: null,
  };

  timezones = [];
  times = [];
  techs = [];
  defaultSkills = [];

  constructor(private app: AppService) { }

  ngOnInit() {
    this.timezones = this.app.getTimezone();
    this.times = this.app.getTimes();
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

    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      this.mentor = JSON.parse(userInfoStr);
      if (this.mentor.skills.length > 0) {
        this.mentor.skills.forEach(skill => {
          this.defaultSkills.push(skill.skillId);
        });
      }
    }
  }

  save() {
    if (this.defaultSkills.length > 0) {
      const skills = [];
      this.defaultSkills.forEach(id => {
        skills.push({ skillId: id, userName: this.mentor.userName });
      });
      delete this.mentor.skills;
      this.mentor.skills = skills;
    }
    this.app.saveMentor(this.mentor).subscribe(
      res => {
        if (res) {
          if (res.error || res.message) {
            console.log(res);
          } else {
            localStorage.setItem('userInfo', JSON.stringify(this.mentor));
            console.log('success');
          }
        }
      },
      error => {
        console.log('error:', error);
      }
    );
  }

}
