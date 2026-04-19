import { Component, OnInit } from '@angular/core';

/* 2026 standings
1- Florida Panthers
2- Edmonton Oilers
3- Minnesota Wild
4- Montreal Canadiens
5- Anaheim Ducks
6- Dallas Stars
7- Vancouver Canucks
8- Detroit Red Wings
9- Toronto Leafs
10- Columbus Jackets
11- Los Angeles Kings
12- New Jersey Devils
13- Philadelphia Flyers
14- Washington Capitals
15- Calgary Flames
16- Colorado Avalanche
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Loterie 2026';
  draftDone: boolean = false;
  displayResultsDone: boolean = false;

  entries = [];
  accumulatedWeight = 0.0;
  finalStandings = [];
  results: string[] = [];
  displayedResults = [];
  displayedIndex = 0;

  pickSlots1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  pickSlots2 = [11, 12, 13, 14, 15, 16];

  ngOnInit() {
    this.addEntry(1, "Floride", 18.5);
    this.addEntry(2, "Edmonton", 13.5);
    this.addEntry(3, "Minnesota", 11.5);
    this.addEntry(4, "Montréal", 9.5);
    this.addEntry(5, "Anaheim", 8.5);

    this.addEntry(6, "Dallas", 7.5);
    this.addEntry(7, "Vancouver", 6.5);
    this.addEntry(8, "Detroit", 6.0);
    this.addEntry(9, "Toronto", 5);
    this.addEntry(10, "Columbus", 3.5);

    this.addEntry(11, "Los Angeles", 3.0);
    this.addEntry(12, "New-Jersey", 2.5);
    this.addEntry(13, "Philadelphie", 2);
    this.addEntry(14, "Washington", 1.5);
    this.addEntry(15, "Calgary", 0.5);
    this.addEntry(16, "Colorado", 0.5);
  }

  onDraft(): void {
    if (this.results.length >= 2 || this.results.length >= this.entries.length) {
      return;
    }

    while (this.results.length < 2) {
      let randomTeam = this.getRandomTeam();
      if (!this.results.includes(randomTeam)) {
        this.results.push(randomTeam);
        console.log("Résultat de pige:" + randomTeam);
      }
    }

    let firstPickWinner = this.results[0];
    let secondPickWinner = this.results[1];

    // Insert first winner
    let firstCurrentRank = this.finalStandings.indexOf(firstPickWinner);
    this.finalStandings.splice(firstCurrentRank, 1); // removes team from list

    let diff = firstCurrentRank - 10;
    if (diff < 0) {
      this.finalStandings.splice(0, 0, firstPickWinner);
      console.log(firstPickWinner + " passe de " + (firstCurrentRank + 1) + " au premier rang");
    }
    else {
      this.finalStandings.splice(diff, 0, firstPickWinner);
      console.log(firstPickWinner + " passe de " + (firstCurrentRank + 1) + " au rang " + (diff + 1));
    }

    // Insert second winner
    let secondCurrentRank = this.finalStandings.indexOf(secondPickWinner);
    this.finalStandings.splice(secondCurrentRank, 1); // removes team from list

    diff = secondCurrentRank - 10;
    if (diff < 0) {
      this.finalStandings.splice(1, 0, secondPickWinner);
      console.log(secondPickWinner + " passe de " + (secondCurrentRank + 1) + " au deuxième rang");
    }
    else {
      this.finalStandings.splice(diff + 1, 0, secondPickWinner);
      console.log(secondPickWinner + " passe de " + (secondCurrentRank + 1) + " au rang " + (diff + 2));
    }

    this.draftDone = true;
  }

  nextTeam():void{
    if(this.finalStandings.length === this.displayedResults.length){
      this.displayResultsDone = true;
      return;
    }

    let endIndex = this.finalStandings.length -1;

    this.displayedResults.push(this.finalStandings[endIndex - this.displayedIndex]);
    this.displayedIndex++;
  }

  addEntry(rank: number, team: string, weight: number) {
    this.accumulatedWeight += weight;
    this.entries.push({ rank: rank, name: team, weight: weight, accumulatedWeight: this.accumulatedWeight });
    this.finalStandings.push(team);

  }
  
  /*
          add  remove  start  end
    push    X                   X
    pop           X            X
    unshift    X             X
    shift           X      X
  */
  getRandomTeam(): string {
    let r = Math.random() * this.accumulatedWeight;
    console.log("Valeur pigée " + r + " sur " + this.accumulatedWeight);
    // this.entries.find(entry.accumulatedWeight >= r)
    return this.entries.find(function (entry) {
      return entry.accumulatedWeight >= r;
    }).name;
  }
}
