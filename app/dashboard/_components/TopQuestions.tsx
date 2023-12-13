import { Badge, Button } from "@radix-ui/themes";
import Link from "next/link";

const TopQuestions = () => {
  return (
    <div className="top-questions col-span-1 md:col-span-2 lg:col-span-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Top Questions</h1>
        <Button variant="solid">
          <Link href={'/dashboard/questions/ask'}>
            Ask question
          </Link>
        </Button>
      </div>
      <div className="question mt-10">
        <div className="list p-4 border-t grid grid-cols-1 md:grid-cols-5 border-gray-200">
          <div className="response col-span-1">
            <p className="answers">3 answers</p>
          </div>
          <div className="title col-span-4">
            <h1 className="text-md mb-3">How to estimate the similarity between different cubic curves using R</h1>
            <div className="flex justify-between items-center">
              <div className="tags">
                <Badge variant="soft" className="mr-2">R</Badge>
                <Badge variant="soft" className="mr-2">Statistic</Badge>
              </div>
              <div className="user">
                <small className="name">Adnan RK, 24 Feb 2023</small>
              </div>
            </div>
          </div>
        </div>
        <div className="list p-4 border-t grid grid-cols-1 md:grid-cols-5 border-gray-200">
          <div className="response col-span-1">
            <p className="answers">3 answers</p>
          </div>
          <div className="title col-span-4">
            <h1 className="text-md mb-3">How to estimate the similarity between different cubic curves using R</h1>
            <div className="flex justify-between items-center">
              <div className="tags">
                <Badge variant="soft" className="mr-2">R</Badge>
                <Badge variant="soft" className="mr-2">Statistic</Badge>
              </div>
              <div className="user">
                <small className="name">Adnan RK, 24 Feb 2023</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopQuestions;
