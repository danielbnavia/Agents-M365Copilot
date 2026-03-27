export interface PackageInfo {
	name: string;
	displayName: string;
	description: string;
	language: "typescript" | "dotnet" | "python";
	version: string;
	status: "stable" | "preview" | "beta";
	registry: string;
	registryUrl: string;
	dependencies: number;
	lastUpdated: string;
}

export const packages: PackageInfo[] = [
	{
		name: "@microsoft/agents-m365copilot",
		displayName: "M365 Copilot Client (Stable)",
		description:
			"Service library with typed models and request builders for Microsoft 365 Copilot APIs. Generated via Kiota.",
		language: "typescript",
		version: "1.0.0-preview.0",
		status: "preview",
		registry: "npm",
		registryUrl: "https://www.npmjs.com/package/@microsoft/agents-m365copilot",
		dependencies: 4,
		lastUpdated: "2025-12-01",
	},
	{
		name: "@microsoft/agents-m365copilot-beta",
		displayName: "M365 Copilot Client (Beta)",
		description:
			"Beta service library with the latest Copilot API surface. May include breaking changes between releases.",
		language: "typescript",
		version: "1.0.0-preview.0",
		status: "beta",
		registry: "npm",
		registryUrl:
			"https://www.npmjs.com/package/@microsoft/agents-m365copilot-beta",
		dependencies: 4,
		lastUpdated: "2025-12-01",
	},
	{
		name: "@microsoft/agents-m365copilot-core",
		displayName: "M365 Copilot Core",
		description:
			"Core library providing HTTP client, authentication, retry policies, and telemetry for the Copilot SDK.",
		language: "typescript",
		version: "1.0.0-preview.0",
		status: "preview",
		registry: "npm",
		registryUrl:
			"https://www.npmjs.com/package/@microsoft/agents-m365copilot-core",
		dependencies: 3,
		lastUpdated: "2025-12-01",
	},
	{
		name: "Microsoft.Agents.M365Copilot",
		displayName: "M365 Copilot .NET SDK",
		description:
			".NET service library with typed models and request builders for Microsoft 365 Copilot APIs.",
		language: "dotnet",
		version: "1.0.0-preview.0",
		status: "preview",
		registry: "NuGet",
		registryUrl:
			"https://www.nuget.org/packages/Microsoft.Agents.M365Copilot",
		dependencies: 5,
		lastUpdated: "2025-12-01",
	},
	{
		name: "microsoft-agents-m365copilot",
		displayName: "M365 Copilot Python SDK",
		description:
			"Python service library with typed models and request builders for Microsoft 365 Copilot APIs.",
		language: "python",
		version: "1.0.0a0",
		status: "preview",
		registry: "PyPI",
		registryUrl:
			"https://pypi.org/project/microsoft-agents-m365copilot/",
		dependencies: 6,
		lastUpdated: "2025-12-01",
	},
];

export interface ApiEndpoint {
	method: "GET" | "POST" | "PATCH" | "DELETE";
	path: string;
	description: string;
	category: string;
}

export const apiEndpoints: ApiEndpoint[] = [
	{
		method: "GET",
		path: "/copilot/messages",
		description: "List all messages in a Copilot conversation",
		category: "Messages",
	},
	{
		method: "POST",
		path: "/copilot/messages",
		description: "Send a new message to a Copilot conversation",
		category: "Messages",
	},
	{
		method: "GET",
		path: "/copilot/messages/{id}",
		description: "Get a specific message by its identifier",
		category: "Messages",
	},
	{
		method: "DELETE",
		path: "/copilot/messages/{id}",
		description: "Delete a specific message",
		category: "Messages",
	},
	{
		method: "GET",
		path: "/copilot/conversations",
		description: "List all Copilot conversations",
		category: "Conversations",
	},
	{
		method: "POST",
		path: "/copilot/conversations",
		description: "Create a new Copilot conversation",
		category: "Conversations",
	},
	{
		method: "GET",
		path: "/copilot/conversations/{id}",
		description: "Retrieve a conversation by ID",
		category: "Conversations",
	},
	{
		method: "PATCH",
		path: "/copilot/conversations/{id}",
		description: "Update a conversation's properties",
		category: "Conversations",
	},
	{
		method: "GET",
		path: "/copilot/plugins",
		description: "List all registered plugins",
		category: "Plugins",
	},
	{
		method: "POST",
		path: "/copilot/plugins",
		description: "Register a new plugin",
		category: "Plugins",
	},
	{
		method: "GET",
		path: "/copilot/skills",
		description: "List available Copilot skills",
		category: "Skills",
	},
	{
		method: "POST",
		path: "/copilot/skills/{id}/invoke",
		description: "Invoke a specific Copilot skill",
		category: "Skills",
	},
];

export interface StatItem {
	label: string;
	value: string;
	change?: string;
	trend?: "up" | "down" | "neutral";
}

export const overviewStats: StatItem[] = [
	{ label: "SDK Packages", value: "5", change: "+2 this quarter", trend: "up" },
	{ label: "Languages", value: "3", change: "TS, .NET, Python", trend: "neutral" },
	{ label: "API Endpoints", value: "12", change: "+4 new", trend: "up" },
	{ label: "Current Version", value: "1.0.0-preview", trend: "neutral" },
];
