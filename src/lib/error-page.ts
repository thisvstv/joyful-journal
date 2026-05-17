export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root{
        --bg: #fafafa;
        --fg: #111111;
        --muted: #4b5563;
        --card-bg: #ffffff;
        --primary-bg: #111111;
        --primary-fg: #ffffff;
        --secondary-bg: #ffffff;
        --secondary-fg: #111111;
        --secondary-border: #d1d5db;
      }
      @media (prefers-color-scheme: dark){
        :root{
          --bg: #0b1220;
          --fg: #e6eef8;
          --muted: #9ca3af;
          --card-bg: #0f1724;
          --primary-bg: #e6eef8;
          --primary-fg: #0b1220;
          --secondary-bg: #0f1724;
          --secondary-fg: #e6eef8;
          --secondary-border: rgba(255,255,255,0.06);
        }
      }
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--fg); display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; background: var(--card-bg); border-radius: 8px; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: var(--muted); margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: var(--primary-bg); color: var(--primary-fg); }
      .secondary { background: var(--secondary-bg); color: var(--secondary-fg); border-color: var(--secondary-border); }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
