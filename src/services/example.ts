import { ToApi } from "@/interfaces/ToApi";

interface Example {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface GetProps {
  id?: number;
}
async function get(): Promise<ToApi<Example[]>>;
async function get(
  props: Pick<Example, "id">
): Promise<ToApi<Example | undefined>>;
async function get(
  props?: GetProps
): Promise<ToApi<Example[] | Example | undefined>> {
  if (props?.id) {
    const response = await fetch(`/api/v1/examples/${props.id}`);
    const data = await response.json();
    return {
      status: "success",
      statusCode: 200,
      message: "Example fetched successfully",
      count: 1,
      data: data,
    };
  }
  const response = await fetch(`/api/v1/examples`);
  const data = await response.json();
  return {
    status: "success",
    statusCode: 200,
    message: "Example fetched successfully",
    count: data.length,
    data: data,
  };
}

const exampleService = { get };

export default exampleService;
