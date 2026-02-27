import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
  type ListOptions,
} from "../client";
import type {
  Segment,
  CreateSegmentRequest,
  UpdateSegmentRequest,
  SegmentEvaluationResult,
} from "../models";

/**
 * List segments
 */
export async function listSegments(
  options?: ListOptions & {
    segment_type?: "user" | "organization" | "workspace";
    target_type?: "user" | "organization" | "workspace";
  },
  client?: WachtClient,
): Promise<PaginatedResponse<Segment>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.offset !== undefined)
    params.append("offset", String(options.offset));
  if (options?.segment_type)
    params.append("segment_type", options.segment_type);
  if (options?.target_type) params.append("target_type", options.target_type);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<Segment>>(
    `/segments${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Get a segment
 */
export async function getSegment(
  segmentId: string,
  client?: WachtClient,
): Promise<Segment> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<Segment>(`/segments/${segmentId}`);
}

/**
 * Create a segment
 */
export async function createSegment(
  request: CreateSegmentRequest,
  client?: WachtClient,
): Promise<Segment> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<Segment>("/segments", request);
}

/**
 * Update a segment
 */
export async function updateSegment(
  segmentId: string,
  request: UpdateSegmentRequest,
  client?: WachtClient,
): Promise<Segment> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<Segment>(`/segments/${segmentId}`, request);
}

/**
 * Delete a segment
 */
export async function deleteSegment(
  segmentId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/segments/${segmentId}`);
}

/**
 * Evaluate a segment for a user
 */
export async function evaluateSegment(
  segmentId: string,
  userId: string,
  client?: WachtClient,
): Promise<SegmentEvaluationResult> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<SegmentEvaluationResult>(
    `/segments/${segmentId}/evaluate`,
    { user_id: userId },
  );
}

/**
 * Evaluate multiple segments for a user
 */
export async function evaluateSegments(
  segmentIds: string[],
  userId: string,
  client?: WachtClient,
): Promise<SegmentEvaluationResult[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<SegmentEvaluationResult[]>("/segments/evaluate-batch", {
    segment_ids: segmentIds,
    user_id: userId,
  });
}

/**
 * Assign users to a segment
 */
export async function assignToSegment(
  segmentId: string,
  userIds: string[],
  client?: WachtClient,
): Promise<{ assigned: number }> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<{ assigned: number }>(`/segments/${segmentId}/assign`, {
    user_ids: userIds,
  });
}

/**
 * Remove users from a segment
 */
export async function removeFromSegment(
  segmentId: string,
  userIds: string[],
  client?: WachtClient,
): Promise<{ removed: number }> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<{ removed: number }>(`/segments/${segmentId}/remove`, {
    user_ids: userIds,
  });
}

/**
 * Get segment data (users matching segment criteria)
 */
export async function getSegmentData(
  request: {
    conditions: {
      operator: "AND" | "OR";
      rules?: Array<{
        field: string;
        operator:
          | "equals"
          | "contains"
          | "starts_with"
          | "ends_with"
          | "greater_than"
          | "less_than";
        value: string;
      }>;
    };
    limit?: number;
    offset?: number;
  },
  client?: WachtClient,
): Promise<{ users: unknown[]; total: number }> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<{ users: unknown[]; total: number }>(
    "/segments/data",
    request,
  );
}
