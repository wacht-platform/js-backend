import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
} from "../client";
import type {
  Segment,
  ListSegmentsOptions,
  CreateSegmentRequest,
  UpdateSegmentRequest,
  SegmentDataRequest,
  AnalyzedEntity,
} from "../models";

/**
 * List segments
 */
export async function listSegments(
  options?: ListSegmentsOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<Segment>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit !== undefined) params.append("limit", String(options.limit));
  if (options?.offset !== undefined)
    params.append("offset", String(options.offset));
  if (options?.search !== undefined) params.append("search", options.search);
  if (options?.sort_key !== undefined) params.append("sort_key", options.sort_key);
  if (options?.sort_order !== undefined) params.append("sort_order", options.sort_order);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<Segment>>(
    `/segments${queryString ? `?${queryString}` : ""}`,
  );
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
): Promise<Record<string, unknown>> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<Record<string, unknown>>(`/segments/${segmentId}`);
}

/**
 * Assign users to a segment
 */
export async function assignToSegment(
  segmentId: string,
  entityId: string,
  client?: WachtClient,
): Promise<Record<string, unknown>> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<Record<string, unknown>>(`/segments/${segmentId}/assign`, {
    entity_id: entityId,
  });
}

/**
 * Remove users from a segment
 */
export async function removeFromSegment(
  segmentId: string,
  entityId: string,
  client?: WachtClient,
): Promise<Record<string, unknown>> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<Record<string, unknown>>(`/segments/${segmentId}/remove`, {
    entity_id: entityId,
  });
}

/**
 * Get segment data (users matching segment criteria)
 */
export async function getSegmentData(
  request: SegmentDataRequest,
  client?: WachtClient,
): Promise<PaginatedResponse<AnalyzedEntity>> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<PaginatedResponse<AnalyzedEntity>>(
    "/segments/data",
    request,
  );
}
