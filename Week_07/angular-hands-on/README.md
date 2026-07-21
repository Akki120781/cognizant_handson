# Student Course Portal

Angular hands-on implementation for the Digital Nurture Java FSE track.

## Scripts

```bash
pnpm install
pnpm run api
pnpm start
pnpm build
pnpm test
```

The app runs on `http://127.0.0.1:4200`. The mock API runs on `http://localhost:3000` using `db.json`.

## Coverage

- Angular CLI workspace, project structure notes and production budget configuration.
- Standalone components for header, home, course list, course detail, profile and not-found views.
- Interpolation, property binding, event binding, two-way binding and lifecycle hooks.
- Parent-child communication with `@Input`, `@Output` and `EventEmitter`.
- Structural control flow, `ngClass`, `ngStyle`, custom highlight directive and custom credit label pipe.
- Template-driven and reactive enrollment forms with built-in, custom and async validation.
- Shared services, service-to-service injection and component-level provider example.
- Nested routing, route parameters, query parameters, lazy loaded enrollment routes and route guards.
- HttpClient integration, RxJS operators, retry/error handling and HTTP interceptors.
- NgRx actions, reducers, effects, selectors and enrollment state.
- Jasmine/Karma tests for component rendering, output events, service HTTP calls and store-connected UI.
