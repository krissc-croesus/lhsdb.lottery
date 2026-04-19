# lhsdb.lottery

Loterie LHSDB — NHL draft lottery simulator for the LHSDB fantasy hockey league.

Built with [Angular](https://angular.io/) 13 and Bootstrap 4.

## Development

```bash
npm start        # Dev server at http://localhost:4200
npm run build    # Development build → dist/lhsdb-lottery/
ng build --configuration production  # Production build
npm test         # Unit tests via Karma
npm run lint     # Lint TypeScript and HTML
```

## Updating for a new season

1. Edit `ngOnInit` in `src/app/app.component.ts` — update each `addEntry(rank, team, weight%)` call with the new standings and lottery odds (weights should sum to 100).
2. Update the `title` field and the heading in `src/app/app.component.html`.
3. Add team logo images (lowercase `.jpg`) to `src/assets/img/logos/`.
