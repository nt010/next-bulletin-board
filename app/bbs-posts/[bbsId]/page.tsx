import { BBSData } from "@/app/types/type";
import Detail from "../../components/layouts/card/detail";

async function getBBSDetailData(id: number) {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });

  const bbsDetailData: BBSData = await response.json();
  return bbsDetailData;
}

const DetailPage = async ({ params }: { params: { bbsId: number } }) => {
  const bbsDetailData = await getBBSDetailData(params.bbsId);
  return <Detail data={bbsDetailData} />;
};

export default DetailPage;
