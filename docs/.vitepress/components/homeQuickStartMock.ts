export interface ContractRecord {
  id: number;
  name: string;
  category: "software" | "service" | "purchase";
  signedAt: string;
  amount: number;
  status: 0 | 1;
  description: string;
}

type QueryParams = {
  name?: string;
  category?: ContractRecord["category"];
  status?: ContractRecord["status"];
};

const wait = (ms = 160) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

export const initialContracts: ContractRecord[] = [
  {
    id: 1001,
    name: "企业协作平台许可",
    category: "software",
    signedAt: "2026-08-01",
    amount: 128000,
    status: 1,
    description: "覆盖 300 名员工的年度软件许可。",
  },
  {
    id: 1002,
    name: "数字化实施服务",
    category: "service",
    signedAt: "2026-07-18",
    amount: 86000,
    status: 1,
    description: "包含需求梳理、系统配置、培训与上线支持。",
  },
  {
    id: 1003,
    name: "研发设备采购",
    category: "purchase",
    signedAt: "2026-07-06",
    amount: 245000,
    status: 0,
    description: "研发中心工作站与测试设备采购。",
  },
  {
    id: 1004,
    name: "数据治理咨询",
    category: "service",
    signedAt: "2026-06-22",
    amount: 156000,
    status: 1,
    description: "建立主数据标准和质量评估体系。",
  },
];

let records: ContractRecord[] = copy(initialContracts);

function copy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export const contractApi = {
  async query(params: QueryParams) {
    await wait();
    return copy(
      records.filter(
        (item) =>
          (!params.name || item.name.includes(params.name)) &&
          (!params.category || item.category === params.category) &&
          (params.status === undefined || item.status === params.status)
      )
    );
  },
  async info(id: number) {
    await wait(80);
    return copy(records.find((item) => item.id === id));
  },
  async save(
    data: Omit<ContractRecord, "id" | "status"> &
      Partial<Pick<ContractRecord, "status">>
  ) {
    await wait();
    records.unshift({
      ...copy(data),
      id: Math.max(...records.map(({ id }) => id), 1000) + 1,
      status: data.status ?? 1,
    });
  },
  async update(data: ContractRecord) {
    await wait();
    const index = records.findIndex(({ id }) => id === data.id);
    if (index >= 0) records[index] = copy(data);
  },
  async delete(ids: number[]) {
    await wait();
    records = records.filter(({ id }) => !ids.includes(id));
  },
  async setStatus(id: number, status: ContractRecord["status"]) {
    await wait(100);
    const record = records.find((item) => item.id === id);
    if (record) record.status = status;
  },
};
