import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getInterviewByUserId,
  getInterviewsWithFeedback,
  getInterviewsWithoutFeedback,
} from "@/lib/actions/general.actions";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const [userInterviews, upcomingInterviews, pastInterviews] =
    await Promise.all([
      getInterviewByUserId(user?.id),
      getInterviewsWithoutFeedback(user?.id),
      getInterviewsWithFeedback(user?.id),
    ]);

  const isUpcomingInterviews = upcomingInterviews?.length! > 0;
  const isPastInterviews = pastInterviews?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview Ready with AI powered practice and feedback</h2>
          <p className="text-lg">
            {" "}
            Practice on real interview questions & get instant feedback
          </p>
          <Button
            asChild
            variant="default"
            className="btn-primary max-sm:w-full"
          >
            <Link href="/interview"> Start an interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Upcoming Interviews</h2>
        <div className="interviews-section">
          {isUpcomingInterviews ? (
            upcomingInterviews?.map((interview) => (
              <InterviewCard
                {...interview}
                key={`${interview.id}-${interview.createdAt}`}
              />
            ))
          ) : (
            <p>
              You don't have any upcoming interviews. Let&apos;s generate one!
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        {" "}
        <h2>Your Past Interviews</h2>
        <div className="interviews-section">
          {isPastInterviews ? (
            pastInterviews?.map((interview) => (
              <InterviewCard
                {...interview}
                key={`${interview.id}-${interview.createdAt}`}
              />
            ))
          ) : (
            <p>You don't taken interviews. Take an interview to get started!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
