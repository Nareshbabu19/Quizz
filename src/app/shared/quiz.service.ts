import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class QuizService {
  readonly rootUrl = "https://backend-quizz.herokuapp.com";
  // https://backend-quizz.herokuapp.com
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;

  constructor(public http: HttpClient) {}
  displayTimeElapsed() {
    return (
      Math.floor(this.seconds / 3600) +
      ":" +
      Math.floor(this.seconds / 60) +
      ":" +
      Math.floor(this.seconds % 60)
    );
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem("participant"));
    return participant.Name;
  }

  insertParticipant(name: string, email: string) {
    var body = {
      name: name,
      email: email,
    };
    return this.http.post(this.rootUrl + "/api/InsertParticipant", body);
  }

  getQuestions() {
    return this.http.get(this.rootUrl + "/api/Questions");
  }

  getAnswers() {
    var body = this.qns.map((x) => x._id);
    return this.http.post(this.rootUrl + "/api/Answers", body);
  }

  submitScore() {
    var body = JSON.parse(localStorage.getItem("participant"));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + "/api/UpdateOutput", body);
  }
}
