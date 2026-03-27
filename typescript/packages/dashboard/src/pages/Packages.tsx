import { useState } from "react";

import { Card } from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { type PackageInfo, packages } from "../data/packages";
import styles from "./Packages.module.css";

type Language = "all" | "typescript" | "dotnet" | "python";

const languageLabels: Record<Language, string> = {
	all: "All Languages",
	typescript: "TypeScript",
	dotnet: ".NET",
	python: "Python",
};

const languageColors: Record<string, string> = {
	typescript: "var(--color-typescript)",
	dotnet: "var(--color-dotnet)",
	python: "var(--color-python)",
};

function PackageCard({ pkg }: { pkg: PackageInfo }) {
	return (
		<Card padding="md">
			<div className={styles.pkgCard}>
				<div className={styles.pkgHeader}>
					<div className={styles.pkgTitleRow}>
						<span
							className={styles.langIndicator}
							style={{ background: languageColors[pkg.language] }}
						/>
						<h3 className={styles.pkgName}>{pkg.displayName}</h3>
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

				<p className={styles.pkgDescription}>{pkg.description}</p>

				<div className={styles.pkgMeta}>
					<code className={styles.pkgIdentifier}>{pkg.name}</code>
				</div>

				<div className={styles.pkgFooter}>
					<div className={styles.pkgStats}>
						<span className={styles.pkgStat}>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
							</svg>
							{pkg.dependencies} deps
						</span>
						<span className={styles.pkgStat}>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
								<line x1="16" y1="2" x2="16" y2="6" />
								<line x1="8" y1="2" x2="8" y2="6" />
								<line x1="3" y1="10" x2="21" y2="10" />
							</svg>
							{pkg.lastUpdated}
						</span>
					</div>
					<a
						href={pkg.registryUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.registryLink}
					>
						{pkg.registry}
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
							<polyline points="15 3 21 3 21 9" />
							<line x1="10" y1="14" x2="21" y2="3" />
						</svg>
					</a>
				</div>
			</div>
		</Card>
	);
}

function Packages() {
	const [filter, setFilter] = useState<Language>("all");

	const filtered =
		filter === "all"
			? packages
			: packages.filter((p) => p.language === filter);

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div>
					<h1 className={styles.title}>Packages</h1>
					<p className={styles.subtitle}>
						Browse SDK packages across TypeScript, .NET, and Python
					</p>
				</div>
			</header>

			<div className={styles.filters}>
				{(Object.entries(languageLabels) as [Language, string][]).map(
					([key, label]) => (
						<button
							key={key}
							className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ""}`}
							onClick={() => setFilter(key)}
						>
							{label}
						</button>
					),
				)}
			</div>

			<div className={styles.grid}>
				{filtered.map((pkg) => (
					<PackageCard key={pkg.name} pkg={pkg} />
				))}
			</div>
		</div>
	);
}

export default Packages;
