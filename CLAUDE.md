# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200 (auto-reloads on changes)
npm run build      # Development build → dist/lhsdb-lottery/
ng build --configuration production  # Production build (optimized)
npm test           # Run unit tests via Karma
npm run lint       # Lint with angular-eslint (covers *.ts and *.html)
ng e2e             # End-to-end tests via Protractor
```

## Architecture

This is a single-component Angular 13 app — there is no routing, no services, and no child components. All logic lives in `src/app/app.component.ts`.

### How the lottery works

The app simulates an NHL draft lottery for a fantasy hockey league (LHSDB). The core data model in `AppComponent`:

- **`entries`** — weighted list of teams built in `ngOnInit` via `addEntry(rank, team, weight)`. Each entry stores a cumulative `accumulatedWeight` used for weighted random selection.
- **`finalStandings`** — ordered list of all teams (worst → best), initialized in the same order teams are added.
- **`getRandomTeam()`** — picks a random number in `[0, totalWeight)` and finds the first entry whose `accumulatedWeight` ≥ that number (linear weighted random).
- **`onDraft()`** — draws 2 winners and repositions them in `finalStandings`: each winner moves up by up to 10 spots (rank − 10), capped at position 1 or 2.
- **`nextTeam()`** — reveals `finalStandings` one team at a time from last (worst pick) to first (best pick).

### Updating for a new year

To update the lottery for a new season:

1. **Edit `ngOnInit` in `src/app/app.component.ts`** — update each `addEntry(rank, team, weight%)` call with the new standings and lottery odds. Weights should sum to 100.
2. **Update `title`** — change `title = 'Loterie 20XX'` and the heading in `app.component.html`.
3. **Add team logos** — place `<teamname>.jpg` files (lowercase) in `src/assets/img/logos/`. The template references them as `assets/img/logos/{{team | lowercase}}.jpg`.
4. **Update the comment block** at the top of `app.component.ts` to record the previous year's standings for historical reference.

### Key constraint

The lottery always draws exactly 2 winners (hardcoded in `onDraft`). If the number of draft picks ever changes, update the `2` constant in `onDraft()`.
