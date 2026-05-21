import { getFilter } from "../../list/services";
import UpdateFIlterForm from "./components/UpdateFIlterForm";

interface UpdateFilterProps {
  params: Promise<{ id: number }>;
}

export default async function UpdateFilter({ params }: UpdateFilterProps) {
  const { id } = await params;

  const filterData = await getFilter(Number(id));

  return (
    <div>
      <UpdateFIlterForm filterData={filterData.data} />
    </div>
  );
}
