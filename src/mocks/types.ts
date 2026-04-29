export type MockId = number;
export type MockISODate = string;
export type MockDateTime = string;

export type MockPriority = "low" | "medium" | "high" | "urgent";
export type MockClientType = "Empresa" | "Residencial" | "Institución";

export type MockClientStatus = "active" | "inactive" | "prospect" | "with_project";
export type MockQuoteStatus = "draft" | "sent" | "approved" | "rejected" | "expired";
export type MockProjectStatus = "pending" | "scheduled" | "in_progress" | "paused" | "completed" | "cancelled";
export type MockTechnicianStatus = "available" | "busy" | "offline" | "inactive";
export type MockServiceStatus = "active" | "inactive" | "draft";
export type MockInventoryStatus = "available" | "low_stock" | "out_of_stock";
export type MockFinanceStatus = "paid" | "pending" | "overdue" | "cancelled";
export type MockEvidenceStatus = "pending_review" | "approved" | "rejected" | "archived";
export type MockCompanyStatus = "active" | "inactive" | "pending_verification";
export type MockUserStatus = "active" | "inactive" | "invited";

export type MockStatus =
  | MockClientStatus
  | MockQuoteStatus
  | MockProjectStatus
  | MockTechnicianStatus
  | MockServiceStatus
  | MockInventoryStatus
  | MockFinanceStatus
  | MockEvidenceStatus
  | MockCompanyStatus
  | MockUserStatus;

export type MockTimelineEvent = {
  id: MockId;
  entityType: "client" | "quote" | "project" | "inventory" | "finance" | "evidence" | "system";
  entityId: MockId | null;
  title: string;
  description?: string;
  createdAt: MockDateTime;
  createdBy?: string;
};

export type MockClient = {
  id: MockId;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  district: string;
  address?: string;
  type: MockClientType;
  status: MockClientStatus;
  tags: string[];
  createdAt: MockISODate;
  updatedAt?: MockISODate;
  notes?: string;
};

export type MockQuoteItem = {
  id: MockId;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type MockQuote = {
  id: MockId;
  code: string;
  clientId: MockId;
  clientName: string;
  service: string;
  status: MockQuoteStatus;
  issueDate: MockISODate;
  expirationDate: MockISODate;
  subtotal: number;
  tax: number;
  total: number;
  responsible: string;
  items: MockQuoteItem[];
  notes?: string;
  terms?: string[];
  createdAt: MockISODate;
  updatedAt?: MockISODate;
};

export type MockProjectTask = {
  id: MockId;
  title: string;
  completed: boolean;
};

export type MockProject = {
  id: MockId;
  code: string;
  name: string;
  clientId: MockId;
  clientName: string;
  quoteId: MockId | null;
  technicianId: MockId | null;
  technicianName: string | null;
  status: MockProjectStatus;
  priority: MockPriority;
  startDate: MockISODate;
  dueDate: MockISODate;
  progress: number;
  isOverdue: boolean;
  budget: number;
  checklist: MockProjectTask[];
  notes?: string;
  createdAt: MockISODate;
  updatedAt?: MockISODate;
};

export type MockTechnicianScheduleItem = {
  id: MockId;
  day: string;
  time: string;
  projectId: MockId | null;
  projectName: string;
};

export type MockTechnician = {
  id: MockId;
  name: string;
  phone: string;
  email: string;
  status: MockTechnicianStatus;
  zone: string;
  specialties: string[];
  activeProjects: number;
  completedProjects: number;
  rating: number;
  lastActivity: MockDateTime;
  assignedTo?: string;
  schedule: MockTechnicianScheduleItem[];
};

export type MockService = {
  id: MockId;
  name: string;
  category: string;
  description: string;
  status: MockServiceStatus;
  basePrice: number;
  estimatedDuration: string;
  timesUsed: number;
  generatedRevenue: number;
  frequentMaterials: string[];
  createdAt: MockISODate;
  updatedAt?: MockISODate;
};

export type MockInventoryItem = {
  id: MockId;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  unit: string;
  supplier: string;
  unitCost: number;
  totalValue: number;
  status: MockInventoryStatus;
  lastMovementAt: MockISODate;
};

export type MockInventoryMovementType = "entry" | "exit" | "adjustment";

export type MockInventoryMovement = {
  id: MockId;
  productId: MockId;
  productName: string;
  type: MockInventoryMovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  projectId: MockId | null;
  projectName: string | null;
  responsible: string;
  createdAt: MockDateTime;
};

export type MockFinanceMovementType = "income" | "expense";

export type MockFinanceMovement = {
  id: MockId;
  code: string;
  type: MockFinanceMovementType;
  concept: string;
  clientName: string | null;
  providerName: string | null;
  projectId: MockId | null;
  projectName: string | null;
  quoteId: MockId | null;
  paymentMethod: string;
  status: MockFinanceStatus;
  amount: number;
  dueDate: MockISODate;
  paidAt: MockISODate | null;
  createdAt: MockISODate;
  notes?: string;
};

export type MockFinanceSummary = {
  monthlyIncome: number;
  monthlyExpenses: number;
  estimatedProfit: number;
  pendingAmount: number;
  overdueAmount: number;
};

export type MockEvidenceType = "photo" | "document" | "invoice" | "signature" | "report";
export type MockEvidenceVisibility = "internal" | "client_visible";

export type MockEvidenceComment = {
  id: MockId;
  author: string;
  message: string;
  createdAt: MockDateTime;
};

export type MockEvidence = {
  id: MockId;
  fileName: string;
  fileUrl: string;
  title: string;
  type: MockEvidenceType;
  status: MockEvidenceStatus;
  visibility: MockEvidenceVisibility;
  projectId: MockId | null;
  projectName: string;
  clientName: string;
  technicianName: string;
  uploadedBy: string;
  uploadedAt: MockDateTime;
  reviewedBy: string | null;
  reviewedAt: MockDateTime | null;
  comments: MockEvidenceComment[];
};

export type MockCompany = {
  id: MockId;
  name: string;
  commercialName: string;
  ruc: string;
  category: string;
  description: string;
  logoUrl: string;
  coverUrl: string;
  status: MockCompanyStatus;
  profileCompletion: number;
  address: string;
  districtsCoverage: string[];
  phone: string;
  email: string;
  website: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
    linkedin: string;
  };
  legalRepresentative: string;
  createdAt: MockISODate;
};

export type MockCompanySchedule = {
  day: string;
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
};

export type MockDashboardStat = {
  label: string;
  value: string;
  helper: string;
};

export type MockDashboard = {
  stats: MockDashboardStat[];
  projects: Array<Pick<MockProject, "name" | "status" | "progress">>;
  activity: MockTimelineEvent[];
};

export type MockPermission =
  | "dashboard.view"
  | "clients.view"
  | "clients.manage"
  | "quotes.view"
  | "quotes.manage"
  | "projects.view"
  | "projects.manage"
  | "technicians.manage"
  | "services.manage"
  | "inventory.manage"
  | "finances.manage"
  | "evidences.manage"
  | "company.manage"
  | "settings.manage";

export type MockUser = {
  id: MockId;
  name: string;
  email: string;
  role: string;
  status: MockUserStatus;
  lastLogin: MockDateTime | null;
};

export type MockRole = {
  id: MockId;
  name: string;
  description: string;
  permissions: MockPermission[];
};

export type MockActivityLog = {
  id: MockId;
  userName: string;
  action: string;
  module: string;
  createdAt: MockDateTime;
};
