import { repository } from "mysql2-wizard";

const repo = repository<{ stationId: number }>({
  table: "station",
  keys: ["stationId"],
});

async function count() {
  const result = await repo.select().calculate([{ fn: "COUNT", alias: "count" }]);
  return result.count;
}
const stationService = {
  count,
};

export default stationService;
