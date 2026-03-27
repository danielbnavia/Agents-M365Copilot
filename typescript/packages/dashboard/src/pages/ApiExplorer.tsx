import { useState } from "react";

import { Card } from "../components/Card";
import { apiEndpoints } from "../data/packages";
import styles from "./ApiExplorer.module.css";

const methodColors: Record<string, string> = {
	GET: "var(--color-success)",
	POST: "var(--color-info)",
	PATCH: "var(--color-warning)",
	DELETE: "var(--color-error)",
};

const categories = ["All", ...new Set(apiEndpoints.map((e) => e.category))];

function ApiExplorer() {
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

	const filtered = apiEndpoints.filter((endpoint) => {
		const matchesSearch =
			search === "" ||
			endpoint.path.toLowerCase().includes(search.toLowerCase()) ||
			endpoint.description.toLowerCase().includes(search.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" || endpoint.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<h1 className={styles.title}>API Explorer</h1>
				<p className={styles.subtitle}>
					Browse the Microsoft 365 Copilot API surface
				</p>
			</header>

			<div className={styles.toolbar}>
				<div className={styles.searchBox}>
					<svg
						className={styles.searchIcon}
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="11" cy="11" r="8" />
						<line x1="21" y1="21" x2="16.65" y2="16.65" />
					</svg>
					<input
						type="text"
						placeholder="Search endpoints..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className={styles.searchInput}
					/>
				</div>

				<div className={styles.categoryFilters}>
					{categories.map((cat) => (
						<button
							key={cat}
							className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.categoryActive : ""}`}
							onClick={() => setSelectedCategory(cat)}
						>
							{cat}
						</button>
					))}
				</div>
			</div>

			<Card padding="sm">
				<div className={styles.endpointList}>
					<div className={styles.listHeader}>
						<span className={styles.colMethod}>Method</span>
						<span className={styles.colPath}>Path</span>
						<span className={styles.colDesc}>Description</span>
						<span className={styles.colCategory}>Category</span>
					</div>
					{filtered.length === 0 ? (
						<div className={styles.empty}>
							No endpoints match your search criteria
						</div>
					) : (
						filtered.map((endpoint, i) => (
							<div key={i} className={styles.endpointRow}>
								<span className={styles.colMethod}>
									<span
										className={styles.methodBadge}
										style={{
											color: methodColors[endpoint.method],
											background: `${methodColors[endpoint.method]}18`,
										}}
									>
										{endpoint.method}
									</span>
								</span>
								<span className={styles.colPath}>
									<code>{endpoint.path}</code>
								</span>
								<span className={styles.colDesc}>
									{endpoint.description}
								</span>
								<span className={styles.colCategory}>
									<span className={styles.categoryTag}>
										{endpoint.category}
									</span>
								</span>
							</div>
						))
					)}
				</div>
			</Card>

			<div className={styles.summary}>
				Showing {filtered.length} of {apiEndpoints.length} endpoints
			</div>
		</div>
	);
}

export default ApiExplorer;
