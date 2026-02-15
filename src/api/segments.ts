import { getClient, type PaginatedResponse, type ListOptions } from '../client';
import type {
  Segment,
  CreateSegmentRequest,
  UpdateSegmentRequest,
  SegmentEvaluationResult,
} from '../models';

/**
 * List segments
 */
export async function listSegments(
  options?: ListOptions & {
    segment_type?: 'user' | 'organization' | 'workspace';
    target_type?: 'user' | 'organization' | 'workspace';
  }
): Promise<PaginatedResponse<Segment>> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', String(options.limit));
  if (options?.offset !== undefined)
    params.append('offset', String(options.offset));
  if (options?.segment_type)
    params.append('segment_type', options.segment_type);
  if (options?.target_type)
    params.append('target_type', options.target_type);
  const queryString = params.toString();
  return client.get<PaginatedResponse<Segment>>(
    `/segments${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Get a segment
 */
export async function getSegment(segmentId: string): Promise<Segment> {
  const client = getClient();
  return client.get<Segment>(`/segments/${segmentId}`);
}

/**
 * Create a segment
 */
export async function createSegment(
  request: CreateSegmentRequest
): Promise<Segment> {
  const client = getClient();
  return client.post<Segment>('/segments', request);
}

/**
 * Update a segment
 */
export async function updateSegment(
  segmentId: string,
  request: UpdateSegmentRequest
): Promise<Segment> {
  const client = getClient();
  return client.patch<Segment>(`/segments/${segmentId}`, request);
}

/**
 * Delete a segment
 */
export async function deleteSegment(segmentId: string): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/segments/${segmentId}`);
}

/**
 * Evaluate a segment for a user
 */
export async function evaluateSegment(
  segmentId: string,
  userId: string
): Promise<SegmentEvaluationResult> {
  const client = getClient();
  return client.post<SegmentEvaluationResult>(
    `/segments/${segmentId}/evaluate`,
    { user_id: userId }
  );
}

/**
 * Evaluate multiple segments for a user
 */
export async function evaluateSegments(
  segmentIds: string[],
  userId: string
): Promise<SegmentEvaluationResult[]> {
  const client = getClient();
  return client.post<SegmentEvaluationResult[]>(
    '/segments/evaluate-batch',
    { segment_ids: segmentIds, user_id: userId }
  );
}

/**
 * Assign users to a segment
 */
export async function assignToSegment(
  segmentId: string,
  userIds: string[]
): Promise<{ assigned: number }> {
  const client = getClient();
  return client.post<{ assigned: number }>(`/segments/${segmentId}/assign`, {
    user_ids: userIds,
  });
}

/**
 * Remove users from a segment
 */
export async function removeFromSegment(
  segmentId: string,
  userIds: string[]
): Promise<{ removed: number }> {
  const client = getClient();
  return client.post<{ removed: number }>(
    `/segments/${segmentId}/remove`,
    { user_ids: userIds }
  );
}

/**
 * Get segment data (users matching segment criteria)
 */
export async function getSegmentData(request: {
  conditions: {
    operator: 'AND' | 'OR';
    rules?: Array<{
      field: string;
      operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than';
      value: string;
    }>;
  };
  limit?: number;
  offset?: number;
}): Promise<{ users: unknown[]; total: number }> {
  const client = getClient();
  return client.post<{ users: unknown[]; total: number }>(
    '/segments/data',
    request
  );
}
