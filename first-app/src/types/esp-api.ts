interface EspApiResponse {
  status: number;
  statusDescription: string;
  response: { [key: string]: any };
}

interface TmQueryAction {
  name: string;
  dataKeys: any[];
  actionId: string;
  type: string;
  limit: number;
  metadataFields: any[];
  notArray: boolean;
  override: boolean;
  actionParams: {
    name: string;
    type: string;
    value: string;
  }[];
}

interface SortInfoProps {
  sort_field: string;
  sort_type: string;
  sort_seq: string;
}

interface searchInfoProps {
  search_field: string;
  search_operator: string;
  search_value: string;
}

interface EspApiByActionParams {
  actionId: string;
  serviceName: string;
  type: string;
  actionParams?: any[];
  businessUnit?: { [key: string]: any };
  bpmData?: { [key: string]: any };
  paras?: { [key: string]: any };
  pageInfo?: {
    nextAllData: boolean;
    pageNo: number;
    pageSize: number;
  };
  sortInfo?: SortInfoProps[];
  searchInfo?: searchInfoProps[];
}

interface EspApiByActionIdParams {
  actionId: string;
  businessUnit?: { [key: string]: any };
  parameter?: { [key: string]: any };
  pageInfo?: {
    nextAllData: boolean;
    pageNo: number;
    pageSize: number;
  };
  sortInfo?: SortInfoProps[];
  searchInfo?: searchInfoProps[];
}

export interface EspApi {
  byAction: (params: EspApiByActionParams) => EspApiResponse;
  byActionId: (params: EspApiByActionIdParams) => EspApiResponse;
}
