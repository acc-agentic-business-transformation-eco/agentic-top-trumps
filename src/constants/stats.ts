import {
    Cog, Brain, Puzzle, Users, Eye, GraduationCap, Code, Scale, Shield,
    Headphones, DollarSign
} from 'lucide-react';
import { VendorCard, StatKey } from '../types';

export const statNames: Record<StatKey, string> = {
    taskOrchestration: "Task Orchestration",
    contextManagement: "Context Management",
    integration: "Integration",
    multiAgent: "Multi-Agent",
    humanOversight: "Human Oversight",
    selfImprovement: "Self-Improvement",
    developmentEase: "Development Ease",
    scalability: "Scalability",
    securityCompliance: "Security & Compliance",
    vendorSupport: "Vendor Support",
    costEffectiveness: "Cost-Effectiveness"
};

export const statIcons = {
    taskOrchestration: Cog,
    contextManagement: Brain,
    integration: Puzzle,
    multiAgent: Users,
    humanOversight: Eye,
    selfImprovement: GraduationCap,
    developmentEase: Code,
    scalability: Scale,
    securityCompliance: Shield,
    vendorSupport: Headphones,
    costEffectiveness: DollarSign
};

export const statDescriptions: Record<string, string> = {
    taskOrchestration: "An agentic AI should be able to reason about a goal, break it into sub-tasks, and carry out multi-step workflows with minimal human guidance.",
    contextManagement: "Memory management capabilities let an AI agent \"remember\" prior user inputs, decisions, or relevant data so it can carry context from one step to the next.",
    integration: "An agentic AI solution must connect with the external tools, data sources, and enterprise systems required to get work done. Top platforms offer extensive integration capabilities, allowing agents to call APIs, databases, CRMs, web services, or other applications as part of their workflow.",
    multiAgent: "Some advanced agentic platforms support multi-agent systems, where multiple AI agents with specialized roles can work in tandem. This capability allows one agent to delegate sub-tasks to others or for a \"team\" of agents to cooperate towards a goal. When evaluating tools, consider if they support orchestrating multiple agents and how they manage inter-agent communication and coordination.",
    humanOversight: "Agents should gracefully defer to humans when needed. Agentic AI solutions often operate in environments where human users or operators are involved, so it's key to assess how the AI interacts with people and allows human-in-the-loop oversight. Consider the agent's user interaction channels: Can it communicate via multiple channels (chat interface, email, messaging apps, voice, etc.)?",
    selfImprovement: "Ability to learn from experience and adapt over time. Check if the tool supports fine-tuning on domain-specific data or incremental learning so it can be customized and get smarter in your context.",
    developmentEase: "The ease with which your team can develop, configure, and maintain the AI agent. Look for low-code or no-code development features. For code-centric frameworks, a well-documented SDK and modular design with pre-built templates or modules for common tasks can speed up implementation.",
    scalability: "Evaluate whether the solution can handle increasing workloads, complex tasks, and large user bases without degradation in performance. Key questions include: Can the platform scale from a small pilot to a production system with thousands of users or agents?",
    securityCompliance: "Any enterprise-ready agentic AI tool must meet high standards for security and compliance. When evaluating, verify that the vendor or platform adheres to industry security certifications and regulations (for example, SOC 2 Type II, ISO 27001, GDPR, CCPA, etc.)",
    vendorSupport: "For long term viability check the vendor backing for a platform. Review case studies to verify clients with successful stories. How strong is the community behind the platform? What guarantees does the vendor offer and is there any history of that to verify.",
    costEffectiveness: "Agentic AI tools vary widely in pricing models. Some charge by usage (API calls or number of agents), others by seat or subscription tier, and some might be included as features in a larger platform. Ensure there is pricing transparency with no hidden fees, and consider the total cost including any needed add-ons (e.g. premium support, extra modules)."
};
