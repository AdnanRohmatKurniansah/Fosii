import { formatDate } from "@/app/utils/formatDate";
import { prisma } from "@/app/utils/prisma";
import { Badge, Button } from "@radix-ui/themes";
import Link from "next/link";

const TopQuestions = async () => {
  const questions = await prisma.question.findMany({
    include: {
      tag: true,
      answers: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      answers: {
        _count: 'desc', 
      },
    },
  })

  const formattedQuestions = questions.map((question) => ({
    id: question.id,
    title: question.title,
    status: question.status,
    tagName: question.tag.name, 
    answersCount: question.answers.length, 
    created_at: question.created_at,
  }))
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
        {formattedQuestions.map((quest, i) => (
          <div key={i} className="list p-4 border-t grid grid-cols-1 md:grid-cols-5 border-gray-200">
            <div className="response col-span-1">
              <p className="answers">{quest.answersCount} answers</p>
              <Badge color={quest.status == 'Open' ? 'blue' : 'crimson'} variant="outline" className="mt-4">{quest.status}</Badge>
            </div>
            <div className="title col-span-4">
              <h1 className="text-md mb-3">{quest.title}</h1>
              <div className="flex justify-between items-center">
                <div className="tags">
                  <Badge variant="soft" className="mr-2">{quest.tagName}</Badge>
                </div>
                <div className="user">
                  <small className="name">{formatDate(quest.created_at)}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopQuestions;
