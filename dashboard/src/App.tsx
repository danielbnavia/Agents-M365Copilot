import './App.css'

const metrics = [
  {
    label: 'Active sessions',
    value: '1,284',
    delta: '+12%',
    positive: true,
  },
  {
    label: 'API requests (24h)',
    value: '48.2k',
    delta: '+3.1%',
    positive: true,
  },
  {
    label: 'P95 latency',
    value: '142 ms',
    delta: '−8 ms',
    positive: true,
  },
  {
    label: 'Error rate',
    value: '0.12%',
    delta: '+0.02%',
    positive: false,
  },
] as const

const activity = [
  { id: '1', title: 'Retrieval batch completed', detail: 'SharePoint · 2,400 docs', time: '2 min ago' },
  { id: '2', title: 'Auth token refreshed', detail: 'Tenant contoso · device code', time: '18 min ago' },
  { id: '3', title: 'Rate limit warning', detail: 'Beta endpoint · 429 x3', time: '1 hr ago' },
  { id: '4', title: 'Deployment healthy', detail: 'dashboard · production', time: '3 hr ago' },
] as const

function App() {
  return (
    <div className="shell">
      <aside className="sidebar" aria-label="Primary">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">Dashboard</span>
        </div>
        <nav className="nav">
          <a className="nav-link nav-link-active" href="#overview">
            Overview
          </a>
          <a className="nav-link" href="#activity">
            Activity
          </a>
          <a className="nav-link" href="#reports">
            Reports
          </a>
          <a className="nav-link" href="#settings">
            Settings
          </a>
        </nav>
        <p className="sidebar-foot">
          Connect live data from your Copilot APIs client or backend when you are ready.
        </p>
      </aside>

      <div className="main">
        <header className="topbar">
          <div>
            <h1 className="page-title">Overview</h1>
            <p className="page-sub">Sample metrics and activity — replace with your API.</p>
          </div>
          <div className="topbar-meta">
            <span className="pill pill-live" title="Demo data">
              Demo data
            </span>
            <time className="muted" dateTime="2026-03-27">
              Fri, Mar 27, 2026
            </time>
          </div>
        </header>

        <section className="metrics" aria-label="Key metrics">
          {metrics.map((m) => (
            <article key={m.label} className="metric-card">
              <p className="metric-label">{m.label}</p>
              <p className="metric-value">{m.value}</p>
              <p className={`metric-delta ${m.positive ? 'metric-delta-up' : 'metric-delta-down'}`}>
                {m.delta}
                <span className="sr-only">{m.positive ? 'favorable change' : 'unfavorable change'}</span>
              </p>
            </article>
          ))}
        </section>

        <div className="panels">
          <section className="panel panel-wide" aria-labelledby="activity-heading">
            <div className="panel-head">
              <h2 id="activity-heading" className="panel-title">
                Recent activity
              </h2>
              <button type="button" className="btn btn-ghost">
                View all
              </button>
            </div>
            <ul className="activity-list">
              {activity.map((row) => (
                <li key={row.id} className="activity-row">
                  <span className="activity-dot" aria-hidden="true" />
                  <div className="activity-body">
                    <p className="activity-title">{row.title}</p>
                    <p className="activity-detail muted">{row.detail}</p>
                  </div>
                  <time className="activity-time muted">{row.time}</time>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel" aria-labelledby="status-heading">
            <h2 id="status-heading" className="panel-title">
              System status
            </h2>
            <ul className="status-list">
              <li className="status-row">
                <span>API</span>
                <span className="status-ok">Operational</span>
              </li>
              <li className="status-row">
                <span>Auth</span>
                <span className="status-ok">Operational</span>
              </li>
              <li className="status-row">
                <span>Jobs</span>
                <span className="status-warn">Degraded</span>
              </li>
            </ul>
            <h3 className="subheading">Quick actions</h3>
            <div className="actions">
              <button type="button" className="btn btn-primary">
                Run health check
              </button>
              <button type="button" className="btn btn-secondary">
                Export report
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
