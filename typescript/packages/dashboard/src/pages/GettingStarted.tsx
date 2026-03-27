import { useState } from "react";

import { Card, CardHeader } from "../components/Card";
import styles from "./GettingStarted.module.css";

type Lang = "typescript" | "dotnet" | "python";

interface CodeSnippet {
	install: string;
	usage: string;
}

const snippets: Record<Lang, CodeSnippet> = {
	typescript: {
		install: `npm install @microsoft/agents-m365copilot-core
npm install @microsoft/agents-m365copilot`,
		usage: `import { CopilotClient } from "@microsoft/agents-m365copilot-core";
import { createCopilotApiClient } from "@microsoft/agents-m365copilot";

// Initialize the client with your auth provider
const authProvider = /* your Azure Identity provider */;
const client = createCopilotApiClient(authProvider);

// List conversations
const conversations = await client.copilot.conversations.get();
console.log(conversations);`,
	},
	dotnet: {
		install: `dotnet add package Microsoft.Agents.M365Copilot --prerelease`,
		usage: `using Microsoft.Agents.M365Copilot;
using Azure.Identity;

// Create an authenticated client
var credential = new DefaultAzureCredential();
var client = new CopilotApiClient(credential);

// List conversations
var conversations = await client.Copilot.Conversations.GetAsync();
Console.WriteLine(conversations);`,
	},
	python: {
		install: `pip install microsoft-agents-m365copilot`,
		usage: `from azure.identity import DefaultAzureCredential
from microsoft_agents_m365copilot import CopilotApiClient

# Create an authenticated client
credential = DefaultAzureCredential()
client = CopilotApiClient(credential)

# List conversations
conversations = await client.copilot.conversations.get()
print(conversations)`,
	},
};

const langLabels: Record<Lang, string> = {
	typescript: "TypeScript",
	dotnet: ".NET",
	python: "Python",
};

function CodeBlock({ code, language }: { code: string; language: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className={styles.codeBlock}>
			<div className={styles.codeHeader}>
				<span className={styles.codeLang}>{language}</span>
				<button className={styles.copyBtn} onClick={handleCopy}>
					{copied ? (
						<>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							Copied
						</>
					) : (
						<>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
								<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
							</svg>
							Copy
						</>
					)}
				</button>
			</div>
			<pre className={styles.codeContent}>
				<code>{code}</code>
			</pre>
		</div>
	);
}

function GettingStarted() {
	const [selectedLang, setSelectedLang] = useState<Lang>("typescript");
	const snippet = snippets[selectedLang];

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<h1 className={styles.title}>Getting Started</h1>
				<p className={styles.subtitle}>
					Set up the Microsoft 365 Copilot SDK in your project
				</p>
			</header>

			<div className={styles.langTabs}>
				{(Object.entries(langLabels) as [Lang, string][]).map(
					([key, label]) => (
						<button
							key={key}
							className={`${styles.langTab} ${selectedLang === key ? styles.langTabActive : ""}`}
							onClick={() => setSelectedLang(key)}
						>
							{label}
						</button>
					),
				)}
			</div>

			<div className={styles.steps}>
				<Card>
					<CardHeader
						title="Step 1: Prerequisites"
						subtitle="Make sure you have the following ready"
					/>
					<ul className={styles.prereqList}>
						<li>
							An Azure subscription with access to Microsoft 365 Copilot APIs
						</li>
						<li>
							An app registration in Azure AD with the required permissions
						</li>
						<li>
							{selectedLang === "typescript" && "Node.js 18+ and npm or yarn"}
							{selectedLang === "dotnet" && ".NET 8.0 SDK or later"}
							{selectedLang === "python" && "Python 3.9+ with pip"}
						</li>
					</ul>
				</Card>

				<Card>
					<CardHeader
						title="Step 2: Install the SDK"
						subtitle="Add the package to your project"
					/>
					<CodeBlock code={snippet.install} language="shell" />
				</Card>

				<Card>
					<CardHeader
						title="Step 3: Initialize and Use"
						subtitle="Create a client and make your first API call"
					/>
					<CodeBlock
						code={snippet.usage}
						language={langLabels[selectedLang]}
					/>
				</Card>

				<Card>
					<CardHeader
						title="Next Steps"
						subtitle="Continue exploring the SDK"
					/>
					<div className={styles.nextSteps}>
						<a href="/api-explorer" className={styles.nextStepLink}>
							<div className={styles.nextStepIcon}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<polyline points="16 18 22 12 16 6" />
									<polyline points="8 6 2 12 8 18" />
								</svg>
							</div>
							<div>
								<span className={styles.nextStepTitle}>
									Explore the API
								</span>
								<span className={styles.nextStepDesc}>
									Browse all available endpoints and operations
								</span>
							</div>
						</a>
						<a href="/packages" className={styles.nextStepLink}>
							<div className={styles.nextStepIcon}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
									<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
									<line x1="12" y1="22.08" x2="12" y2="12" />
								</svg>
							</div>
							<div>
								<span className={styles.nextStepTitle}>
									View All Packages
								</span>
								<span className={styles.nextStepDesc}>
									See packages across TypeScript, .NET, and Python
								</span>
							</div>
						</a>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default GettingStarted;
