import './App.css'

type Metric = {
  label: string
  value: string
  delta: string
  trend: 'up' | 'down'
}

type FeedItem = {
  title: string
  detail: string
  time: string
  tone: 'good' | 'watch' | 'risk'
}

type HealthItem = {
  name: string
  status: 'Healthy' | 'Degraded' | 'Syncing'
  latency: string
  coverage: string
}

const metrics: Metric[] = [
  { label: 'Weekly active copilots', value: '18.4k', delta: '+12.6%', trend: 'up' },
  { label: 'Successful grounded answers', value: '94.2%', delta: '+1.8%', trend: 'up' },
  { label: 'Escalations to human ops', value: '126', delta: '-9.3%', trend: 'down' },
  { label: 'Avg. response latency', value: '1.6s', delta: '-240ms', trend: 'down' },
]

const feed: FeedItem[] = [
  {
    title: 'Retrieval quality improved after SharePoint re-index',
    detail: 'Grounded answer rate rose across finance and HR copilots after the nightly content refresh.',
    time: '8 min ago',
    tone: 'good',
  },
  {
    title: 'Teams meeting insights pipeline is delayed',
    detail: 'Transcript ingestion is processing a backlog for 3 large meetings. No data loss detected.',
    time: '21 min ago',
    tone: 'watch',
  },
  {
    title: 'Connector auth expires for Salesforce sandbox tomorrow',
    detail: 'Renew the delegated secret to avoid losing citations in customer success copilots.',
    time: '54 min ago',
    tone: 'risk',
  },
]

const connectors: HealthItem[] = [
  { name: 'SharePoint retrieval', status: 'Healthy', latency: '1.2s', coverage: '99.3%' },
  { name: 'Teams meeting insights', status: 'Syncing', latency: '2.1s', coverage: '96.8%' },
  { name: 'Salesforce knowledge sync', status: 'Degraded', latency: '3.4s', coverage: '91.4%' },
  { name: 'ServiceNow incidents', status: 'Healthy', latency: '1.5s', coverage: '98.7%' },
]

const rolloutMilestones = [
  'Roll out limited mode to 4 pilot departments',
  'Audit low-citation prompts and add grounding hints',
  'Publish executive scorecard every Monday at 08:00 UTC',
]

const adoptionSegments = [
  { name: 'Sales', usage: 88 },
  { name: 'Support', usage: 76 },
  { name: 'HR', usage: 63 },
  { name: 'Finance', usage: 58 },
]

function App() {
  return (
    <main className="dashboard-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Microsoft 365 Copilot operations</p>
          <h1>Dashboard starter for Copilot adoption, reliability, and risk.</h1>
          <p className="hero-copy">
            Track whether copilots are grounded, responsive, and ready to scale across the
            organization from a single operational view.
          </p>
        </div>
        <div className="hero-card" aria-label="Deployment summary">
          <span className="hero-card__label">Current release</span>
          <strong>Spring pilot wave</strong>
          <p>2,480 users onboarded across 6 business units with governance guardrails enabled.</p>
          <div className="hero-card__meta">
            <span>Tenant health: Stable</span>
            <span>Next review: Today 16:30 UTC</span>
          </div>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Key metrics">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span className="metric-card__label">{metric.label}</span>
            <strong>{metric.value}</strong>
            <span
              className={`metric-card__delta metric-card__delta--${metric.trend}`}
              aria-label={`${metric.delta} ${metric.trend === 'up' ? 'increase' : 'decrease'}`}
            >
              {metric.delta}
            </span>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel panel--wide">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Live operations feed</p>
              <h2>What changed in the last hour</h2>
            </div>
            <button className="panel__action" type="button">
              Export status
            </button>
          </div>
          <div className="feed-list">
            {feed.map((item) => (
              <div className="feed-item" key={item.title}>
                <span className={`feed-item__tone feed-item__tone--${item.tone}`} />
                <div className="feed-item__body">
                  <div className="feed-item__row">
                    <strong>{item.title}</strong>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <p className="panel__eyebrow">Rollout checklist</p>
          <h2>Next actions</h2>
          <ul className="checklist">
            {rolloutMilestones.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel panel--wide">
          <p className="panel__eyebrow">Connector health</p>
          <h2>Knowledge sources</h2>
          <div className="health-table" role="table" aria-label="Connector health table">
            <div className="health-table__header" role="row">
              <span role="columnheader">Connector</span>
              <span role="columnheader">Status</span>
              <span role="columnheader">Latency</span>
              <span role="columnheader">Coverage</span>
            </div>
            {connectors.map((connector) => (
              <div className="health-table__row" key={connector.name} role="row">
                <span role="cell">{connector.name}</span>
                <span role="cell">
                  <span
                    className={`status-pill status-pill--${connector.status.toLowerCase()}`}
                  >
                    {connector.status}
                  </span>
                </span>
                <span role="cell">{connector.latency}</span>
                <span role="cell">{connector.coverage}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <p className="panel__eyebrow">Adoption by org</p>
          <h2>Usage distribution</h2>
          <div className="usage-list">
            {adoptionSegments.map((segment) => (
              <div className="usage-row" key={segment.name}>
                <div className="usage-row__labels">
                  <span>{segment.name}</span>
                  <span>{segment.usage}%</span>
                </div>
                <div className="usage-row__bar">
                  <span style={{ '--usage-percent': `${segment.usage}%` } as React.CSSProperties} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
