import { Card, CardHeader } from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { overviewStats, packages } from "../data/packages";
import styles from "./Overview.module.css";

const languageColors: Record<string, string> = {
	typescript: "var(--color-typescript)",
	dotnet: "var(--color-dotnet)",
	python: "var(--color-python)",
};

function Overview() {
	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<h1 className={styles.title}>Dashboard</h1>
				<p className={styles.subtitle}>
					Microsoft 365 Copilot SDK overview and status
				</p>
			</header>

			<div className={styles.statsGrid}>
				{overviewStats.map((stat) => (
					<Card key={stat.label} padding="md">
						<div className={styles.statCard}>
							<span className={styles.statLabel}>{stat.label}</span>
							<span className={styles.statValue}>{stat.value}</span>
							{stat.change && (
								<span
									className={`${styles.statChange} ${stat.trend === "up" ? styles.trendUp : ""}`}
								>
									{stat.change}
								</span>
							)}
						</div>
					</Card>
				))}
			</div>

			<div className={styles.sectionGrid}>
				<Card>
					<CardHeader
						title="Package Status"
						subtitle="Current state across all languages"
					/>
					<div className={styles.packageList}>
						{packages.map((pkg) => (
							<div key={pkg.name} className={styles.packageRow}>
								<div className={styles.packageInfo}>
									<span
										className={styles.langDot}
										style={{ background: languageColors[pkg.language] }}
									/>
									<div>
										<span className={styles.packageName}>
											{pkg.displayName}
										</span>
										<span className={styles.packageMeta}>
											{pkg.registry} · {pkg.version}
										</span>
									</div>
								</div>
								<StatusBadge
									label={pkg.status}
									variant={
										pkg.status === "stable"
											? "success"
											: pkg.status === "beta"
												? "warning"
												: "info"
									}
								/>
							</div>
						))}
					</div>
				</Card>

				<Card>
					<CardHeader
						title="Quick Links"
						subtitle="Common resources and actions"
					/>
					<div className={styles.linkList}>
						<a
							href="https://github.com/microsoft/agents-m365copilot-sdk"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.linkItem}
						>
							<span className={styles.linkIcon}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
								</svg>
							</span>
							<div>
								<span className={styles.linkTitle}>GitHub Repository</span>
								<span className={styles.linkDesc}>Source code and issues</span>
							</div>
						</a>
						<a
							href="https://learn.microsoft.com/en-us/microsoft-365-copilot/"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.linkItem}
						>
							<span className={styles.linkIcon}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
									<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
								</svg>
							</span>
							<div>
								<span className={styles.linkTitle}>Documentation</span>
								<span className={styles.linkDesc}>
									Microsoft Learn guides
								</span>
							</div>
						</a>
						<a
							href="https://learn.microsoft.com/en-us/graph/"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.linkItem}
						>
							<span className={styles.linkIcon}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<circle cx="12" cy="12" r="10" />
									<line x1="2" y1="12" x2="22" y2="12" />
									<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
								</svg>
							</span>
							<div>
								<span className={styles.linkTitle}>Microsoft Graph</span>
								<span className={styles.linkDesc}>
									Graph API reference
								</span>
							</div>
						</a>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default Overview;
