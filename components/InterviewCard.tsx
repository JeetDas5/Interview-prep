import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "./DisplayTechIcons";
import { getFeedbackByInterviewId } from "@/lib/actions/general.actions";

const InterviewCard = async ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
  status,
}: InterviewCardProps) => {
  const feedback =
    userId && id
      ? await getFeedbackByInterviewId({ interviewId: id, userId })
      : null;
  const normalisedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("DD/MM/YYYY");

  const isUpcoming = status === "upcoming";


  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalisedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />
          <h3 className="mt-5 capitalise">{role} Interview</h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calender"
                width={22}
                height={22}
                className="object-fit"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="star.svg" alt="star" width={22} height={22} />
              {!isUpcoming ? <p>{feedback?.totalScore}/100</p> : <p>---/100</p>}
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {!isUpcoming
              ? feedback
                ? feedback.finalAssessment
                : "Feedback not available"
              : "Feedback will be available after the interview is completed"}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary">
            {!isUpcoming ? (
              <Link className="text-white" href={`/interview/${id}/feedback`}>
                View Feedback
              </Link>
            ) : (
              <Link className="text-white" href={`/interview/${id}`}>
                Take Interview
              </Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
