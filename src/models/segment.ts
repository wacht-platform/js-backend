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

/**
 * Segment filter
 * Used for segment creation and evaluation
 */
export interface SegmentFilter {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: unknown;
}

/**
 * Segment evaluation result
 * Returned by segment evaluation endpoints
 */
export interface SegmentEvaluationResult {
  segment_id: string;
  matched: boolean;
}
