import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface IntegrationsBrandInformation {
  brand_name: string | null;
  fb_page_ids: string | null;
  google_ads_account_ids: string | null;
  id: Generated<number>;
  report_order: number | null;
}

export interface IntegrationsFbLeadsAdAccountConfig {
  ad_account_id: string;
  business_manager_id: string;
  comment: string | null;
  is_enabled: boolean;
}

export interface IntegrationsFbLeadsAdInformation {
  ad_account_id: string | null;
  ad_id: string;
  ad_name: string | null;
  adset_id: string | null;
  adset_name: string | null;
  campaign_id: string | null;
  campaign_name: string | null;
  configured_status: string | null;
  created_time: Timestamp | null;
  creative_id: string | null;
  creative_name: string | null;
  effective_status: string | null;
  full_details: string | null;
  page_ids: string | null;
  preview_shareable_link: string | null;
  row_created_at: Timestamp | null;
  row_updated_at: Timestamp | null;
  status: string | null;
  updated_time: Timestamp | null;
}

export interface IntegrationsFbLeadsFormInformation {
  created_time: Timestamp | null;
  form_id: string;
  form_name: string | null;
  full_details: string | null;
  page_id: string;
  row_created_at: Timestamp | null;
  row_updated_at: Timestamp | null;
}

export interface IntegrationsFbLeadsWebhook {
  ad_group_id: string | null;
  ad_id: string | null;
  created_at: Timestamp | null;
  form_id: string;
  id: Generated<Int8>;
  is_organic: boolean | null;
  lead_id: string | null;
  page_id: string;
  platform: string | null;
  row_created_at: Timestamp | null;
  row_proceed_finish: Timestamp | null;
  row_proceed_start: Timestamp | null;
  row_proceed_to_brand: string | null;
  row_proceed_to_lead_id: number | null;
  webhook_data: string | null;
}

export interface IntegrationsWebsiteWebhook {
  brand: string | null;
  id: Generated<Int8>;
  row_created_at: Timestamp | null;
  row_proceed_finish: Timestamp | null;
  row_proceed_start: Timestamp | null;
  row_proceed_to_brand: string | null;
  row_proceed_to_lead_id: number | null;
  webhook_data: string | null;
}

export interface NcApiTokens {
  base_id: string | null;
  created_at: Timestamp | null;
  db_alias: string | null;
  description: string | null;
  enabled: Generated<boolean | null>;
  expiry: string | null;
  fk_sso_client_id: string | null;
  fk_user_id: string | null;
  id: Generated<number>;
  permissions: string | null;
  token: string | null;
  updated_at: Timestamp | null;
}

export interface NcAuditV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  description: string | null;
  details: string | null;
  fk_model_id: string | null;
  fk_org_id: string | null;
  fk_parent_id: string | null;
  fk_ref_id: string | null;
  fk_user_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  ip: string | null;
  old_id: string | null;
  op_sub_type: string | null;
  op_type: string | null;
  row_id: string | null;
  source_id: string | null;
  status: string | null;
  updated_at: Generated<Timestamp>;
  user: string | null;
  user_agent: string | null;
  version: Generated<number | null>;
}

export interface NcAuditV2Old {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  description: string | null;
  details: string | null;
  fk_model_id: string | null;
  fk_parent_id: string | null;
  fk_ref_id: string | null;
  fk_user_id: string | null;
  id: string;
  ip: string | null;
  op_sub_type: string | null;
  op_type: string | null;
  row_id: string | null;
  source_id: string | null;
  status: string | null;
  updated_at: Generated<Timestamp>;
  user: string | null;
  user_agent: string | null;
  version: Generated<number | null>;
}

export interface NcBasesV2 {
  color: string | null;
  created_at: Generated<Timestamp>;
  default_role: string | null;
  deleted: Generated<boolean | null>;
  description: string | null;
  id: string;
  is_meta: boolean | null;
  meta: string | null;
  order: number | null;
  password: string | null;
  prefix: string | null;
  roles: string | null;
  status: string | null;
  title: string | null;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcBaseUsersV2 {
  base_id: string;
  color: string | null;
  created_at: Generated<Timestamp>;
  fk_user_id: string;
  group: string | null;
  hidden: number | null;
  invited_by: string | null;
  opened_date: Timestamp | null;
  order: number | null;
  pinned: boolean | null;
  roles: string | null;
  starred: boolean | null;
  updated_at: Generated<Timestamp>;
}

export interface NcCalendarViewColumnsV2 {
  base_id: string | null;
  bold: boolean | null;
  created_at: Generated<Timestamp>;
  fk_column_id: string | null;
  fk_view_id: string | null;
  id: string;
  italic: boolean | null;
  order: number | null;
  show: boolean | null;
  source_id: string | null;
  underline: boolean | null;
  updated_at: Generated<Timestamp>;
}

export interface NcCalendarViewRangeV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_from_column_id: string | null;
  fk_to_column_id: string | null;
  fk_view_id: string | null;
  id: string;
  label: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcCalendarViewV2 {
  base_id: string | null;
  created_at: Timestamp | null;
  fk_cover_image_col_id: string | null;
  fk_view_id: string;
  meta: string | null;
  source_id: string | null;
  title: string | null;
  updated_at: Timestamp | null;
}

export interface NcColBarcodeV2 {
  barcode_format: string | null;
  base_id: string | null;
  created_at: Generated<Timestamp>;
  deleted: boolean | null;
  fk_barcode_value_column_id: string | null;
  fk_column_id: string | null;
  id: string;
  updated_at: Generated<Timestamp>;
}

export interface NcColButtonV2 {
  base_id: string | null;
  color: string | null;
  created_at: Generated<Timestamp>;
  error: string | null;
  fk_column_id: string | null;
  fk_integration_id: string | null;
  fk_webhook_id: string | null;
  fk_workspace_id: string | null;
  formula: string | null;
  formula_raw: string | null;
  icon: string | null;
  id: string;
  label: string | null;
  model: string | null;
  output_column_ids: string | null;
  parsed_tree: string | null;
  theme: string | null;
  type: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcColFormulaV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  deleted: boolean | null;
  error: string | null;
  fk_column_id: string | null;
  formula: string;
  formula_raw: string | null;
  id: string;
  order: number | null;
  parsed_tree: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcColLongTextV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  error: string | null;
  fk_column_id: string | null;
  fk_integration_id: string | null;
  fk_model_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  model: string | null;
  prompt: string | null;
  prompt_raw: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcColLookupV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  deleted: boolean | null;
  fk_column_id: string | null;
  fk_lookup_column_id: string | null;
  fk_relation_column_id: string | null;
  id: string;
  updated_at: Generated<Timestamp>;
}

export interface NcColQrcodeV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  deleted: boolean | null;
  fk_column_id: string | null;
  fk_qr_value_column_id: string | null;
  id: string;
  order: number | null;
  updated_at: Generated<Timestamp>;
}

export interface NcColRelationsV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  db_type: string | null;
  deleted: boolean | null;
  dr: string | null;
  fk_child_column_id: string | null;
  fk_column_id: string | null;
  fk_index_name: string | null;
  fk_mm_base_id: string | null;
  fk_mm_child_column_id: string | null;
  fk_mm_model_id: string | null;
  fk_mm_parent_column_id: string | null;
  fk_mm_source_id: string | null;
  fk_parent_column_id: string | null;
  fk_related_base_id: string | null;
  fk_related_model_id: string | null;
  fk_related_source_id: string | null;
  fk_target_view_id: string | null;
  id: string;
  ref_db_alias: string | null;
  type: string | null;
  updated_at: Generated<Timestamp>;
  ur: string | null;
  virtual: boolean | null;
}

export interface NcColRollupV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  deleted: boolean | null;
  fk_column_id: string | null;
  fk_relation_column_id: string | null;
  fk_rollup_column_id: string | null;
  id: string;
  rollup_function: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcColSelectOptionsV2 {
  base_id: string | null;
  color: string | null;
  created_at: Generated<Timestamp>;
  fk_column_id: string | null;
  id: string;
  order: number | null;
  title: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcColumnsV2 {
  ai: boolean | null;
  au: boolean | null;
  base_id: string | null;
  cc: string | null;
  cdf: string | null;
  clen: string | null;
  column_name: string | null;
  cop: string | null;
  created_at: Generated<Timestamp>;
  csn: string | null;
  ct: string | null;
  custom_index_name: string | null;
  deleted: boolean | null;
  description: string | null;
  dt: string | null;
  dtx: string | null;
  dtxp: string | null;
  dtxs: string | null;
  fk_model_id: string | null;
  id: string;
  meta: string | null;
  np: string | null;
  ns: string | null;
  order: number | null;
  pk: boolean | null;
  pv: boolean | null;
  readonly: Generated<boolean | null>;
  rqd: boolean | null;
  source_id: string | null;
  system: Generated<boolean | null>;
  title: string | null;
  uidt: string | null;
  un: boolean | null;
  unique: boolean | null;
  updated_at: Generated<Timestamp>;
  validate: string | null;
  virtual: boolean | null;
}

export interface NcCommentReactions {
  base_id: string | null;
  comment_id: string | null;
  created_at: Generated<Timestamp>;
  created_by: string | null;
  fk_model_id: string | null;
  id: string;
  reaction: string | null;
  row_id: string | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcComments {
  base_id: string | null;
  comment: string | null;
  created_at: Generated<Timestamp>;
  created_by: string | null;
  created_by_email: string | null;
  fk_model_id: string | null;
  id: string;
  is_deleted: boolean | null;
  parent_comment_id: string | null;
  resolved_by: string | null;
  resolved_by_email: string | null;
  row_id: string | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcDashboardsV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  created_by: string | null;
  description: string | null;
  fk_custom_url_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  meta: string | null;
  order: number | null;
  owned_by: string | null;
  password: string | null;
  title: string;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcDataReflection {
  created_at: Generated<Timestamp>;
  database: string | null;
  fk_workspace_id: string | null;
  id: string;
  password: string | null;
  updated_at: Generated<Timestamp>;
  username: string | null;
}

export interface NcDisabledModelsForRoleV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  disabled: Generated<boolean | null>;
  fk_view_id: string | null;
  id: string;
  role: string | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcExtensions {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  extension_id: string | null;
  fk_user_id: string | null;
  id: string;
  kv_store: string | null;
  meta: string | null;
  order: number | null;
  title: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcFileReferences {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  deleted: Generated<boolean | null>;
  file_size: number | null;
  file_url: string | null;
  fk_column_id: string | null;
  fk_model_id: string | null;
  fk_user_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  is_external: Generated<boolean | null>;
  source_id: string | null;
  storage: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcFilterExpV2 {
  base_id: string | null;
  comparison_op: string | null;
  comparison_sub_op: string | null;
  created_at: Generated<Timestamp>;
  fk_column_id: string | null;
  fk_hook_id: string | null;
  fk_link_col_id: string | null;
  fk_parent_column_id: string | null;
  fk_parent_id: string | null;
  fk_row_color_condition_id: string | null;
  fk_value_col_id: string | null;
  fk_view_id: string | null;
  fk_widget_id: string | null;
  id: string;
  is_group: boolean | null;
  logical_op: string | null;
  order: number | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
  value: string | null;
}

export interface NcFormViewColumnsV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  description: string | null;
  enable_scanner: boolean | null;
  fk_column_id: string | null;
  fk_view_id: string | null;
  help: string | null;
  id: string;
  label: string | null;
  meta: string | null;
  order: number | null;
  required: boolean | null;
  show: boolean | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcFormViewV2 {
  banner_image_url: string | null;
  base_id: string | null;
  created_at: Generated<Timestamp>;
  email: string | null;
  fk_view_id: string;
  heading: string | null;
  logo_url: string | null;
  meta: string | null;
  redirect_after_secs: string | null;
  redirect_url: string | null;
  show_blank_form: boolean | null;
  source_id: string | null;
  subheading: string | null;
  submit_another_form: boolean | null;
  success_msg: string | null;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcGalleryViewColumnsV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_column_id: string | null;
  fk_view_id: string | null;
  help: string | null;
  id: string;
  label: string | null;
  order: number | null;
  show: boolean | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcGalleryViewV2 {
  base_id: string | null;
  cover_image: string | null;
  cover_image_idx: number | null;
  created_at: Generated<Timestamp>;
  dimensions: string | null;
  fk_cover_image_col_id: string | null;
  fk_view_id: string;
  meta: string | null;
  next_enabled: boolean | null;
  prev_enabled: boolean | null;
  public: boolean | null;
  responsive_columns: string | null;
  restrict_number: string | null;
  restrict_size: string | null;
  restrict_types: string | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcGridViewColumnsV2 {
  aggregation: Generated<string | null>;
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_column_id: string | null;
  fk_view_id: string | null;
  group_by: boolean | null;
  group_by_order: number | null;
  group_by_sort: string | null;
  help: string | null;
  id: string;
  label: string | null;
  order: number | null;
  show: boolean | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
  width: Generated<string | null>;
}

export interface NcGridViewV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_view_id: string;
  meta: string | null;
  row_height: number | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcHookLogsV2 {
  base_id: string | null;
  conditions: string | null;
  created_at: Generated<Timestamp>;
  error: string | null;
  error_code: string | null;
  error_message: string | null;
  event: string | null;
  execution_time: number | null;
  fk_hook_id: string | null;
  id: string;
  notification: string | null;
  operation: string | null;
  payload: string | null;
  response: string | null;
  source_id: string | null;
  test_call: Generated<boolean | null>;
  triggered_by: string | null;
  type: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcHooksV2 {
  active: Generated<boolean | null>;
  async: Generated<boolean | null>;
  base_id: string | null;
  condition: Generated<boolean | null>;
  created_at: Generated<Timestamp>;
  description: string | null;
  env: Generated<string | null>;
  event: string | null;
  fk_model_id: string | null;
  headers: string | null;
  id: string;
  notification: string | null;
  operation: string | null;
  payload: Generated<boolean | null>;
  retries: Generated<number | null>;
  retry_interval: Generated<number | null>;
  source_id: string | null;
  timeout: Generated<number | null>;
  title: string | null;
  trigger_field: Generated<boolean | null>;
  type: string | null;
  updated_at: Generated<Timestamp>;
  url: string | null;
  version: string | null;
}

export interface NcHookTriggerFields {
  base_id: string;
  created_at: Generated<Timestamp>;
  fk_column_id: string;
  fk_hook_id: string;
  fk_workspace_id: string;
  updated_at: Generated<Timestamp>;
}

export interface NcIntegrationsStoreV2 {
  created_at: Generated<Timestamp>;
  fk_integration_id: string | null;
  fk_user_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  slot_0: string | null;
  slot_1: string | null;
  slot_2: string | null;
  slot_3: string | null;
  slot_4: string | null;
  slot_5: number | null;
  slot_6: number | null;
  slot_7: number | null;
  slot_8: number | null;
  slot_9: number | null;
  sub_type: string | null;
  type: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcIntegrationsV2 {
  config: string | null;
  created_at: Generated<Timestamp>;
  created_by: string | null;
  deleted: Generated<boolean | null>;
  id: string;
  is_default: Generated<boolean | null>;
  is_encrypted: Generated<boolean | null>;
  is_private: Generated<boolean | null>;
  meta: string | null;
  order: number | null;
  sub_type: string | null;
  title: string | null;
  type: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcJobs {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_user_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  job: string | null;
  result: string | null;
  status: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcKanbanViewColumnsV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_column_id: string | null;
  fk_view_id: string | null;
  help: string | null;
  id: string;
  label: string | null;
  order: number | null;
  show: boolean | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcKanbanViewV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_cover_image_col_id: string | null;
  fk_grp_col_id: string | null;
  fk_view_id: string;
  meta: string | null;
  order: number | null;
  password: string | null;
  public: boolean | null;
  show: boolean | null;
  show_all_fields: boolean | null;
  source_id: string | null;
  title: string | null;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcMapViewColumnsV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_column_id: string | null;
  fk_view_id: string | null;
  help: string | null;
  id: string;
  label: string | null;
  order: number | null;
  project_id: string | null;
  show: boolean | null;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcMapViewV2 {
  base_id: string | null;
  created_at: Timestamp | null;
  fk_geo_data_col_id: string | null;
  fk_view_id: string;
  meta: string | null;
  source_id: string | null;
  title: string | null;
  updated_at: Timestamp | null;
  uuid: string | null;
}

export interface NcMcpTokens {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_user_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  order: number | null;
  title: string | null;
  token: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcModelsV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  created_by: string | null;
  deleted: boolean | null;
  description: string | null;
  enabled: Generated<boolean | null>;
  fk_custom_url_id: string | null;
  id: string;
  meta: string | null;
  mm: Generated<boolean | null>;
  order: number | null;
  owned_by: string | null;
  password: string | null;
  pinned: boolean | null;
  schema: string | null;
  source_id: string | null;
  synced: Generated<boolean | null>;
  table_name: string | null;
  tags: string | null;
  title: string | null;
  type: Generated<string | null>;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcOrgsV2 {
  created_at: Generated<Timestamp>;
  id: string;
  title: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcPermissions {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  created_by: string | null;
  enforce_for_automation: Generated<boolean | null>;
  enforce_for_form: Generated<boolean | null>;
  entity: string | null;
  entity_id: string | null;
  fk_workspace_id: string | null;
  granted_role: string | null;
  granted_type: string | null;
  id: string;
  permission: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcPermissionSubjects {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_permission_id: string;
  fk_workspace_id: string | null;
  subject_id: string;
  subject_type: string;
  updated_at: Generated<Timestamp>;
}

export interface NcPluginsV2 {
  active: Generated<boolean | null>;
  category: string | null;
  created_at: Generated<Timestamp>;
  creator: string | null;
  creator_website: string | null;
  description: string | null;
  docs: string | null;
  icon: string | null;
  id: string;
  input: string | null;
  input_schema: string | null;
  logo: string | null;
  price: string | null;
  rating: number | null;
  status: Generated<string | null>;
  status_details: string | null;
  tags: string | null;
  title: string | null;
  updated_at: Generated<Timestamp>;
  version: string | null;
}

export interface NcRowColorConditions {
  base_id: string | null;
  color: string | null;
  created_at: Generated<Timestamp>;
  fk_view_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  is_set_as_background: boolean | null;
  nc_order: number | null;
  updated_at: Generated<Timestamp>;
}

export interface NcSharedBases {
  created_at: Generated<Timestamp>;
  db_alias: string | null;
  enabled: Generated<boolean | null>;
  id: Generated<number>;
  password: string | null;
  project_id: string | null;
  roles: Generated<string | null>;
  shared_base_id: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcSharedViewsV2 {
  allow_copy: boolean | null;
  created_at: Generated<Timestamp>;
  deleted: boolean | null;
  fk_view_id: string | null;
  id: string;
  meta: string | null;
  order: number | null;
  password: string | null;
  query_params: string | null;
  show_all_fields: boolean | null;
  updated_at: Generated<Timestamp>;
  view_id: string | null;
}

export interface NcSortV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  direction: Generated<string | null>;
  fk_column_id: string | null;
  fk_view_id: string | null;
  id: string;
  order: number | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcSourcesV2 {
  alias: string | null;
  base_id: string | null;
  config: string | null;
  created_at: Generated<Timestamp>;
  deleted: Generated<boolean | null>;
  description: string | null;
  enabled: Generated<boolean | null>;
  erd_uuid: string | null;
  fk_integration_id: string | null;
  id: string;
  inflection_column: string | null;
  inflection_table: string | null;
  is_data_readonly: Generated<boolean | null>;
  is_encrypted: Generated<boolean | null>;
  is_local: Generated<boolean | null>;
  is_meta: boolean | null;
  is_schema_readonly: Generated<boolean | null>;
  meta: string | null;
  order: number | null;
  type: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcStore {
  base_id: string | null;
  created_at: Timestamp | null;
  db_alias: Generated<string | null>;
  env: string | null;
  id: Generated<number>;
  key: string | null;
  tag: string | null;
  type: string | null;
  updated_at: Timestamp | null;
  value: string | null;
}

export interface NcSyncConfigs {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_integration_id: string | null;
  fk_model_id: string | null;
  fk_parent_sync_config_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  last_sync_at: Timestamp | null;
  next_sync_at: Timestamp | null;
  on_delete_action: Generated<string | null>;
  sync_category: string | null;
  sync_job_id: string | null;
  sync_trigger: string | null;
  sync_trigger_cron: string | null;
  sync_trigger_secret: string | null;
  sync_type: string | null;
  title: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcSyncLogsV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_sync_source_id: string | null;
  id: string;
  status: string | null;
  status_details: string | null;
  time_taken: number | null;
  updated_at: Generated<Timestamp>;
}

export interface NcSyncMappings {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_model_id: string | null;
  fk_sync_config_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  target_table: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcSyncSourceV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  deleted: boolean | null;
  details: string | null;
  enabled: Generated<boolean | null>;
  fk_user_id: string | null;
  id: string;
  order: number | null;
  source_id: string | null;
  title: string | null;
  type: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcTeamsV2 {
  created_at: Generated<Timestamp>;
  id: string;
  org_id: string | null;
  title: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcTeamUsersV2 {
  created_at: Generated<Timestamp>;
  org_id: string | null;
  updated_at: Generated<Timestamp>;
  user_id: string | null;
}

export interface NcUserCommentNotificationsPreference {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  fk_model_id: string | null;
  id: string;
  preferences: string | null;
  row_id: string | null;
  source_id: string | null;
  updated_at: Generated<Timestamp>;
  user_id: string | null;
}

export interface NcUserRefreshTokens {
  created_at: Generated<Timestamp>;
  expires_at: Timestamp | null;
  fk_user_id: string | null;
  meta: string | null;
  token: string | null;
  updated_at: Generated<Timestamp>;
}

export interface NcUsersV2 {
  blocked: Generated<boolean | null>;
  blocked_reason: string | null;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  display_name: string | null;
  email: string | null;
  email_verification_token: string | null;
  email_verified: boolean | null;
  id: string;
  invite_token: string | null;
  invite_token_expires: string | null;
  is_deleted: Generated<boolean | null>;
  is_new_user: boolean | null;
  meta: string | null;
  password: string | null;
  reset_password_expires: Timestamp | null;
  reset_password_token: string | null;
  roles: Generated<string | null>;
  salt: string | null;
  token_version: string | null;
  updated_at: Generated<Timestamp>;
  user_name: string | null;
}

export interface NcViewsV2 {
  base_id: string | null;
  created_at: Generated<Timestamp>;
  created_by: string | null;
  description: string | null;
  fk_model_id: string | null;
  id: string;
  is_default: boolean | null;
  lock_type: Generated<string | null>;
  meta: string | null;
  order: number | null;
  owned_by: string | null;
  password: string | null;
  row_coloring_mode: string | null;
  show: boolean | null;
  show_system_fields: boolean | null;
  source_id: string | null;
  title: string | null;
  type: number | null;
  updated_at: Generated<Timestamp>;
  uuid: string | null;
}

export interface NcWidgetsV2 {
  base_id: string | null;
  config: string | null;
  created_at: Generated<Timestamp>;
  description: string | null;
  error: boolean | null;
  fk_dashboard_id: string;
  fk_model_id: string | null;
  fk_view_id: string | null;
  fk_workspace_id: string | null;
  id: string;
  meta: string | null;
  order: number | null;
  position: string | null;
  title: string;
  type: string;
  updated_at: Generated<Timestamp>;
}

export interface Notification {
  body: string | null;
  created_at: Generated<Timestamp>;
  fk_user_id: string | null;
  id: string;
  is_deleted: Generated<boolean | null>;
  is_read: Generated<boolean | null>;
  type: string | null;
  updated_at: Generated<Timestamp>;
}

export interface P9gyt5ysvuuldscFBAds {
  Ad_Name: string | null;
  Adset_Name: string | null;
  Campaign_Name: string | null;
  created_at: Timestamp | null;
  created_by: string | null;
  Creative_Name: string | null;
  Display_Name: string | null;
  Full_Details: string | null;
  id: Generated<number>;
  nc_order: Numeric | null;
  updated_at: Timestamp | null;
  updated_by: string | null;
}

export interface P9gyt5ysvuuldscFBAdsInsights {
  created_at: Timestamp | null;
  created_by: string | null;
  id: Generated<number>;
  nc_order: Numeric | null;
  title: string | null;
  updated_at: Timestamp | null;
  updated_by: string | null;
}

export interface P9gyt5ysvuuldscLeads {
  Branch: string | null;
  Browser_Information__user_agent_: string | null;
  Campaign_Content__utm_content_: string | null;
  Campaign_Medium__utm_medium_: string | null;
  Campaign_Name__utm_campaign_: string | null;
  Campaign_Source__utm_source_: string | null;
  Campaign_Term__utm_term_: string | null;
  Coupon: string | null;
  created_at: Timestamp | null;
  created_by: string | null;
  Facebook_Click_Identifier__fbclid_: string | null;
  "FB Ads_id": number | null;
  Full_Record__full_record_: string | null;
  Google_Click_Identifier__gclid_: string | null;
  id: Generated<number>;
  "Keyman__人名_": string | null;
  landing_url: string | null;
  nc_order: Numeric | null;
  Remarks: string | null;
  updated_at: Timestamp | null;
  updated_by: string | null;
  User_identifier__uid_: string | null;
  User_IP__uip_: string | null;
  "來源": string | null;
  "入會類別": string | null;
  "姓名": string | null;
  "實際到店日期": Timestamp | null;
  "平台": string | null;
  "查詢內容__其他_": string | null;
  "查詢日期": Timestamp | null;
  "聯絡電話": string | null;
  "跟進後用戶情況": string | null;
  "電子郵件": string | null;
  "預約到店日期": Timestamp | null;
  "願意接收最新資訊及優惠": Generated<boolean | null>;
  "首次付款金額": Numeric | null;
}

export interface Pj144lwve97fm7oFeatures {
  created_at: Timestamp | null;
  created_by: string | null;
  id: Generated<number>;
  nc_order: Numeric | null;
  title: string | null;
  updated_at: Timestamp | null;
  updated_by: string | null;
}

export interface XcKnexMigrations {
  batch: number | null;
  id: Generated<number>;
  migration_time: Timestamp | null;
  name: string | null;
}

export interface XcKnexMigrationsLock {
  index: Generated<number>;
  is_locked: number | null;
}

export interface XcKnexMigrationsv2 {
  batch: number | null;
  id: Generated<number>;
  migration_time: Timestamp | null;
  name: string | null;
}

export interface XcKnexMigrationsv2Lock {
  index: Generated<number>;
  is_locked: number | null;
}

export interface DB {
  "integrations.brand_information": IntegrationsBrandInformation;
  "integrations.fb_leads_ad_account_config": IntegrationsFbLeadsAdAccountConfig;
  "integrations.fb_leads_ad_information": IntegrationsFbLeadsAdInformation;
  "integrations.fb_leads_form_information": IntegrationsFbLeadsFormInformation;
  "integrations.fb_leads_webhook": IntegrationsFbLeadsWebhook;
  "integrations.website_webhook": IntegrationsWebsiteWebhook;
  nc_api_tokens: NcApiTokens;
  nc_audit_v2: NcAuditV2;
  nc_audit_v2_old: NcAuditV2Old;
  nc_base_users_v2: NcBaseUsersV2;
  nc_bases_v2: NcBasesV2;
  nc_calendar_view_columns_v2: NcCalendarViewColumnsV2;
  nc_calendar_view_range_v2: NcCalendarViewRangeV2;
  nc_calendar_view_v2: NcCalendarViewV2;
  nc_col_barcode_v2: NcColBarcodeV2;
  nc_col_button_v2: NcColButtonV2;
  nc_col_formula_v2: NcColFormulaV2;
  nc_col_long_text_v2: NcColLongTextV2;
  nc_col_lookup_v2: NcColLookupV2;
  nc_col_qrcode_v2: NcColQrcodeV2;
  nc_col_relations_v2: NcColRelationsV2;
  nc_col_rollup_v2: NcColRollupV2;
  nc_col_select_options_v2: NcColSelectOptionsV2;
  nc_columns_v2: NcColumnsV2;
  nc_comment_reactions: NcCommentReactions;
  nc_comments: NcComments;
  nc_dashboards_v2: NcDashboardsV2;
  nc_data_reflection: NcDataReflection;
  nc_disabled_models_for_role_v2: NcDisabledModelsForRoleV2;
  nc_extensions: NcExtensions;
  nc_file_references: NcFileReferences;
  nc_filter_exp_v2: NcFilterExpV2;
  nc_form_view_columns_v2: NcFormViewColumnsV2;
  nc_form_view_v2: NcFormViewV2;
  nc_gallery_view_columns_v2: NcGalleryViewColumnsV2;
  nc_gallery_view_v2: NcGalleryViewV2;
  nc_grid_view_columns_v2: NcGridViewColumnsV2;
  nc_grid_view_v2: NcGridViewV2;
  nc_hook_logs_v2: NcHookLogsV2;
  nc_hook_trigger_fields: NcHookTriggerFields;
  nc_hooks_v2: NcHooksV2;
  nc_integrations_store_v2: NcIntegrationsStoreV2;
  nc_integrations_v2: NcIntegrationsV2;
  nc_jobs: NcJobs;
  nc_kanban_view_columns_v2: NcKanbanViewColumnsV2;
  nc_kanban_view_v2: NcKanbanViewV2;
  nc_map_view_columns_v2: NcMapViewColumnsV2;
  nc_map_view_v2: NcMapViewV2;
  nc_mcp_tokens: NcMcpTokens;
  nc_models_v2: NcModelsV2;
  nc_orgs_v2: NcOrgsV2;
  nc_permission_subjects: NcPermissionSubjects;
  nc_permissions: NcPermissions;
  nc_plugins_v2: NcPluginsV2;
  nc_row_color_conditions: NcRowColorConditions;
  nc_shared_bases: NcSharedBases;
  nc_shared_views_v2: NcSharedViewsV2;
  nc_sort_v2: NcSortV2;
  nc_sources_v2: NcSourcesV2;
  nc_store: NcStore;
  nc_sync_configs: NcSyncConfigs;
  nc_sync_logs_v2: NcSyncLogsV2;
  nc_sync_mappings: NcSyncMappings;
  nc_sync_source_v2: NcSyncSourceV2;
  nc_team_users_v2: NcTeamUsersV2;
  nc_teams_v2: NcTeamsV2;
  nc_user_comment_notifications_preference: NcUserCommentNotificationsPreference;
  nc_user_refresh_tokens: NcUserRefreshTokens;
  nc_users_v2: NcUsersV2;
  nc_views_v2: NcViewsV2;
  nc_widgets_v2: NcWidgetsV2;
  notification: Notification;
  "p9gyt5ysvuuldsc.FB Ads": P9gyt5ysvuuldscFBAds;
  "p9gyt5ysvuuldsc.FB Ads Insights": P9gyt5ysvuuldscFBAdsInsights;
  "p9gyt5ysvuuldsc.leads": P9gyt5ysvuuldscLeads;
  "pj144lwve97fm7o.Features": Pj144lwve97fm7oFeatures;
  xc_knex_migrations: XcKnexMigrations;
  xc_knex_migrations_lock: XcKnexMigrationsLock;
  xc_knex_migrationsv2: XcKnexMigrationsv2;
  xc_knex_migrationsv2_lock: XcKnexMigrationsv2Lock;
}
