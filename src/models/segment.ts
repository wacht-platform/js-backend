/**
 * Segment model
 * Generated from OpenAPI spec - matches backend API exactly
 */
export interface Segment {
  id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  deployment_id: string;
  name: string;
  type: 'organization' | 'workspace' | 'user';
}

/**
 * Request to create a segment
 */
export interface CreateSegmentRequest {
  name: string;
  type: 'organization' | 'workspace' | 'user';
}

/**
 * Request to update a segment
 */
export interface UpdateSegmentRequest {
  name?: string;
}

export interface ListSegmentsOptions {
  limit?: number;
  offset?: number;
  search?: string;
  sort_key?: string;
  sort_order?: string;
}

export interface UserSegmentDataFilter {
  name?: string;
  email?: string;
  phone?: string;
}

export interface OrganizationSegmentDataFilter {
  name?: string;
}

export interface WorkspaceSegmentDataFilter {
  name?: string;
}

export interface SegmentDataFilters {
  user?: UserSegmentDataFilter;
  organization?: OrganizationSegmentDataFilter;
  workspace?: WorkspaceSegmentDataFilter;
  segment_id?: string;
}

export interface SegmentDataRequest {
  target_type: "user" | "organization" | "workspace";
  filters?: SegmentDataFilters;
}

export interface AnalyzedEntity {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
}
