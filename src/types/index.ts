export interface VendorCard {
    name: string;
    taskOrchestration: number;
    contextManagement: number;
    integration: number;
    multiAgent: number;
    humanOversight: number;
    selfImprovement: number;
    developmentEase: number;
    scalability: number;
    securityCompliance: number;
    vendorSupport: number;
    costEffectiveness: number;
    color: string;
    description: string;
    slug?: string;
    summary?: string;
    case_studies?: { title: string; summary: string }[];
    contact_emails?: string[];
}

export type StatKey = keyof Omit<VendorCard, 'name' | 'description' | 'color' | 'summary' | 'case_studies' | 'contact_emails' | 'slug'>;

export type Theme = 'light' | 'dark' | 'vibrant';
